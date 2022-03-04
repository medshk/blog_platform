import { useEffect, useMemo, useRef, useState } from "react";
import { parseJsonText } from "typescript";
import Parser from 'editorjs-viewer'
import { getPost } from '../../firebaseConfig'
import { useAuth } from "../../contexts/authContext";
import { useParams } from "react-router-dom";
import Loader from "../layout/loader";

const PostDetails = () => {
    const post = useRef(null)
    const [postData, setPostData] = useState(null)
    const [coverImg, setCoverImg] = useState("")
    const [isPending, setIsPending] = useState(false)
    const [createdAt,setCreatedAt] = useState("")
    const user = useAuth()
    const params = useParams()
  
    useEffect(() => {
        setIsPending(true)
        getPost(params.id).then(res =>{
        setPostData(res)
        setCoverImg(res.data.coverImage)
        console.log("responde",res.data.coverImage)
        const date = new Date(res.data.createdAt)
        setCreatedAt(date.toDateString().slice(3))
        const html = Parser(res.data.body.blocks)
        post.current.innerHTML = html
        setIsPending(false)
        })
    },[])

    return ( 
        <div className="display-post-container">
            {isPending &&<Loader/>}
            { postData && user &&
            <div className="cover-img">
           {coverImg && <img src={coverImg} alt="" />}
            <div>
            <p>{postData.data.topic}</p>
            <h1>{postData.data.title}</h1>
            <p><span style={{color:'#f0f2f5'}}>{user.displayName}</span>{createdAt}</p>
            </div>
            </div>}
            { postData &&
            <div className="blog-post"  >
               
                <div className="post-details" ref={post}></div> 
            </div>}
        </div>
     );
}
 
export default PostDetails;