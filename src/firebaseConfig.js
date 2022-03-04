import { initializeApp } from 'firebase/app'
import {
  getFirestore, collection, onSnapshot,
  addDoc, deleteDoc, doc,
  query, where,setDoc,
  orderBy, serverTimestamp,
  getDoc, limit, updateDoc
} from 'firebase/firestore'
import { ref, getDownloadURL, uploadBytesResumable, getStorage } from "firebase/storage";
import { getAuth, signInWithCustomToken,onAuthStateChanged } from 'firebase/auth'
import { useState, useEffect } from 'react/cjs/react.development';

export const firebaseConfig = {
    apiKey: process.env.REACT_API_KEY,
    authDomain:process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket:process.env.REACT_APP_STORAGE_BUCKET ,
    messagingSenderId:process.env.REACT_APP_MESSAGE_SENDER_ID,
    appId:process.env.REACT_APP_APP_ID ,
    measurementId: process.env.REACT_APP_MESUREMENT_ID
  };
  console.log('apiiiiiiiiiiiiiiiiii',process.env.REACT_API_KEY)

  // init firebase
   const app =  initializeApp(firebaseConfig);

  // init services
  export const db = getFirestore()

  // init auth
  export  const auth = getAuth()

  //get the snapShot returned from fireStore
  const getSnapShot = query =>{
    let data = [];
    onSnapshot(query,(snapShot)=>{
        snapShot.docs.forEach(doc=>{
            data.push({...doc.data(),id:doc.id})
        })
    })
    return data
  }

  // --post requests--
  // get all posts order by createAt
  export const getPosts = () =>{
      const colRef = collection(db,"posts")
     return  getSnapShot(colRef)
  }

  // callbacl function for swr
  export const GetSwrPosts = () =>{
    const [data, setData] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(null)
    const colRef = collection(db,"posts")
    useEffect(() => {
      const unsucbsribe = onSnapshot(colRef,(snapShot)=>{
        setIsPending(true)
        setError(null)
        let tmp = []
        snapShot.docs.forEach(doc=>{
            tmp.push({...doc.data(),id:doc.id})
        })

        // return data
        setData(tmp)
        setError(null)
        setIsPending(false)
        },
      error =>{
        setError(error)
        setData(null)
        setIsPending(false)
      }
    )
    return () => {
      unsucbsribe()
    };
  // end useEffect
  },[]);
     return { data, isPending ,error}
  }


  // get posts by author
  export const  getPostByAuthor = (authorId) =>{
    const colRef = collection(db,"posts")
    const q = query(colRef,where("author","==",authorId))
    return getSnapShot(q)
  }


  // get most viewed posts
  export const getMostViewedPosts = ()=>{
      const colRef = collection(db,"posts")
      const q = query(colRef,orderBy("view"),limit(4))
      return getSnapShot(q)
  }


  // get post by topic 
  export const postByTopic = (topic)=>{
    const colRef = collection(db,"posts")
    const q = query(colRef,where("topic","==",topic))
    return getSnapShot(q)
  }

  // get a single post
  export const getPost = (postId)=>{
      return new Promise((resolve,reject) =>{
      const docRef = doc(db,"posts",postId)
      let data = {}
      onSnapshot(docRef,doc=>{
          data = {data:doc.data(),id:doc.id}
          console.log("xxx",data)
          resolve(data)
      })
       
      // reject("this blog doesn't exists")
     })
     
   
  }

  // upload an image to the fireStore storage
export const uploadImage = (image) =>{
    if(!image) return;
    const url = new Promise((resolve,reject)=>{
    const storage = getStorage(app);
    const storageRef = ref(storage,`/images/${Date.now().toString()}${image.name}`)
    const uploadTask = uploadBytesResumable(storageRef,image)
    
    uploadTask.on(
        "state_changed",
        (snapshot) => {
         console.log( Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          ));
         
        },
        (error) => reject(error),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            // return image url
            console.log('download url',downloadURL)
            resolve(downloadURL)
           
          });
        }
      );
    })
   
    return url;
  
}


  // add post
  export const addPost = (post) =>{
    return new Promise((resolve)=>{
    const colRef = collection(db,"posts")
    addDoc(colRef,post)
    .then((doc) => {
      console.log("post added successfully")
      resolve(doc.id)
    })
  })
  }


  // --author requests--
  // get a sigle author
  export const getAuthor = async(authorId) =>{
    const docRef = doc(db, "authors", authorId);
    const docSnap = await getDoc(docRef);
    return docSnap.data()
  }
  // get all authors
  export const getAuthors = () =>{
    const colRef = collection(db,"authors")
    return  getSnapShot(colRef)
  }



  // get auhors by topic



  // get top authors filter by posts view number



  // add author
  export const createAuthor = (author) =>{
    const colRef = collection(db,"authors")
    setDoc(doc(colRef,author.authorId),author)
    .then(() => {
      console.log("author created successfully")
    })
  }

  // update author info
  export const updateAuthorInfo = async(authorId,data) =>{
    const colRef = collection(db,"authors")
    const docRef = doc(db,"authors",authorId)
      updateDoc(docRef,data).then(()=>{
        console.log("profile infos updated successfuly")
      })
  }
 
  // stock images to array whenever user add images to editor js doc
  // images array
  export let imageArray = [];