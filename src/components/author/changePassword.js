import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup';
import { useRef, useState, useEffect } from 'react/cjs/react.development';
import { signInWithEmailAndPassword , updatePassword} from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import { useAuth } from '../../contexts/authContext';

const ChangePassword = () => {
    let schema = yup.object().shape({
        newPassword: yup.string().required().min(8),
    })
    const {register , handleSubmit,
        formState :{ errors ,isValid}
     } = useForm({
         mode: 'onChange',
         resolver: yupResolver(schema)
     })
     const user = useAuth()
     const saveButtonRef = useRef(null)
     const [error, setError] = useState({currentPassword: "",confirmPassword:""})
     const [successMessage, setSuccessMessage] = useState("")

     
    useEffect(() => {
        // check if it's not the first time the component renders
        if( isValid ){
        saveButtonRef.current.style.opacity = 1
        }
        else { 
            saveButtonRef.current.style.opacity = 0.3
        }
      
    }, [isValid]);

     const submit = (data) =>{
        signInWithEmailAndPassword(
            auth,
            user.email,
            data.currentPassword
        )
        .then((cred)=>{
            setError("")
            if(data.newPassword !== data.confirmPassword){
                setError({confirmPassword:"password is not the same"})
            }
            else {
                updatePassword(user,data.newPassword).then(()=>{
                    console.log("password updated successfuly")
                    setSuccessMessage("password updated successfuly")
                })
                .catch((error)=>{
                    console.log(error.message)
                    if(error.message.toString().includes("recent-login")){
                       setError({confirmPassword:"this action requires fresh login"})
                    }
                })
            }
        })
        .catch((error)=>{
            setError({currentPassword:"password is not correct"})
        })
     }

    return (
       <form onSubmit={handleSubmit(submit)}>   
            <div className="password">
                <label htmlFor="password">Current password</label>
                <input 
                    {...register("currentPassword")}
                    type="password" 
                    placeholder='••••••' />
                    <p className='errors'>{error.currentPassword}</p>
            </div>
            <div className="password">
                <label htmlFor="password">New password</label>
                <input 
                    {...register("newPassword")}
                    type="password" 
                    placeholder='••••••' />
                    <p className='errors'>{errors.newPassword?.message}</p>
            </div>
            <div className="password">
                <label htmlFor="password">Confirm password</label>
                <input 
                    {...register("confirmPassword")}
                    type="password" 
                    placeholder='••••••' />
                    <p className='errors'>{error.confirmPassword}</p>
            </div>
            <button 
                ref={saveButtonRef}
                disabled= {(!isValid)}
                className='btn' 
                style={{marginLeft:"auto",height:"2.3rem",opacity:.3}} > 
                Save Changes
            </button>
            <p style={{color:'green'}}>{successMessage}</p>
       </form>
    );
}

export default ChangePassword;
