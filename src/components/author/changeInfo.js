import React from 'react';
import { useRef , useState, useEffect, useCallback} from 'react/cjs/react.development';
import { useAuth } from '../../contexts/authContext';
import { useForm } from 'react-hook-form';
import { yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup';
import { updateEmail, updateProfile } from 'firebase/auth';
import { auth, getAuthor, updateAuthorInfo, uploadImage } from '../../firebaseConfig';

let schema = yup.object().shape({
    username: yup.string().required().min(6),
    email: yup.string().email().required()
})

const ChangeInfo = () => {
    const user =useAuth()
    const { email } = user 
    const author = getAuthor(user.uid)
    const saveButtonRef = useRef(null)
    const [bio, setBio] = useState(null)
    const [niche, setNiche] = useState(null)
    const [error, setError] = useState("")
    const [successMessage, setSuccessMessage] = useState("")
    const {register , handleSubmit,
        formState :{ errors ,isValid , isDirty}
     } = useForm({
         mode: 'onChange',
         defaultValues :{
             username : user.displayName,
             email : user.email,
         },
         resolver: yupResolver(schema)
     })

    // form input
    const [imageFile, setImageFile] = useState(null)
    const [photo,setPhoto] = useState(null)
    const date = new Date(user.metadata.creationTime)
    const joinDate = date.toDateString().slice(3)


    useEffect(() => {
        // check if it's not the first time the component renders
        if(isDirty || photo){
        saveButtonRef.current.style.opacity = 1
        }
        else { 
            saveButtonRef.current.style.opacity = 0.3
        }
      
    }, [isDirty,photo]);

    useEffect(()=>{ 
       
        author.then((result)=>{
            return result
        }).then((res)=>{
            setBio(res.bio)
            setNiche(res.niche)
            console.log("bio",res.bio)
        })
       
    },[author])
    const handlePhoto = (e) =>{
        const file = e.target.files[0]
        setImageFile(file)
       const reader = new FileReader();
        reader.onload = ()=>{
            setPhoto(reader.result)
        }
        reader.readAsDataURL(file);
    }
    const submit = async (data) =>{
        console.log(user)
        console.log("auth",auth.currentUser)
       if(photo){
       const url = await uploadImage(imageFile)
       updateProfile(user,{photoURL: url, displayName:data.username})
       .then(()=>{
        updateAuthorInfo(user.uid,{photoURL: url,displayName: data.username})
           console.log("profile pic update successfuly")
           setSuccessMessage("your infos update successfuly")
       })
       .catch((error)=>{
        console.log(error.message)
        setError(error.message)
       })
        }
        if(data.email !== user.email){
            updateEmail(user,data.email)
            .then(()=>{
                updateAuthorInfo(user.uid,{email: data.email})
                console.log("email updated successfuly")
                setSuccessMessage("your infos update successfuly")
            })
            .catch((error)=>{
                setError(error.message)
                console.log(error.message)
            })
        }
        if(data.bio !== ""){
        updateAuthorInfo(user.uid,{bio: data.bio})
        setSuccessMessage("your infos update successfuly")
        }
        if(data.niche !== ""){
            updateAuthorInfo(user.uid,{niche: data.niche})
            setSuccessMessage("your infos update successfuly")
        }
      
    }

    return (
        <>
            <div className="display-info">
                    <div className="profile-pic">
                    {user.photoURL &&
                    <img src={ photo ? photo :user.photoURL} 
                    draggable="false"
                    alt="" />}  
                    {/* <div className="edit">
                    <i class="fas fa-crop-alt"></i>
                    </div> */}
                    </div>
                    <div className="display-email">
                        <span>{email.split('@')[0]}</span>
                        <span>{`@${email.split('@')[1]}`}</span>
                        <label className='btn'>
                        <i class="fas fa-camera"></i>
                        Change Photo
                        <input 
                        type="file" 
                        {...register("profilePic")}
                        style={{display:"none"}} 
                        onChange={e => {handlePhoto(e)}}
                        accept="image/png, image/gif, image/jpeg"
                        />
                        </label>
                    </div>
                    <div className="join-date">
                        <small>joined {joinDate}</small>
                    </div>
                    </div>
                    <form onSubmit={handleSubmit(submit)}>
                        <div className="name">
                            <label htmlFor="name">Username</label>
                            <input
                                name="username"
                                {...register("username")} 
                                type="text" 
                                defaultValue={user.displayName} />
                                <p className="errors">{errors && errors.username?.message}</p>
                        </div>
                        <div className="email">
                        <label htmlFor="email">Email</label>
                            <input 
                                name="email"
                                {...register("email",{required: "Please enter your email"})}
                                type="email" 
                                placeholder={user.email} />
                                <p className="errors">{errors && errors.email?.message}</p>
                        </div>
                        <div className="email">
                        <label htmlFor="email">Niche</label>
                            <input 
                                name="email"
                                {...register("niche")}
                                defaultValue={niche}
                                type="text" 
                                placeholder="Enter your Proficiency" />
                                <p className="errors">{errors && errors.email?.message}</p>
                        </div>
                        <div className="bio">
                        <label htmlFor="bio">Bio</label>
                        <textarea 
                            {...register("bio")}
                            defaultValue={bio}
                            style={{height:'10rem'}}  
                            placeholder="tell us about your self"/>
                        </div>
                        <p style={{color:'red'}}></p>
                        <button 
                            ref={saveButtonRef}
                            disabled= {(!isDirty && !isValid) && !photo}
                            className='btn' 
                            style={{marginLeft:"auto",height:"2.3rem",opacity:.3}} > 
                            Save Changes
                        </button>
                        <p className='errors'>{error}</p>
                        <p style={{color:'green'}}>{successMessage}</p>
                    </form>
        </>
    );
}

export default ChangeInfo;
