import { signOut } from "@firebase/auth";
import { useNavigate } from "react-router";
import { auth } from "../../firebaseConfig";
import {useState} from 'react'
import { useAuth } from "../../contexts/authContext";
import { useEffect } from "react/cjs/react.development";
import { Link } from "react-router-dom";
const ProfileDropDown = ({profileDropDown}) => {
    const navigate = useNavigate()
    const user  = useAuth()
    const { email } = user || {} 
 
    const logout = async () => {
        await signOut(auth);
        navigate('/login')
        
      };
    return ( 
        <div ref={profileDropDown} className="profile-dropDown">
            {user &&<div className="top-sec">
                <div className="img-wrapper">
                   { user.photoURL &&<img src={user.photoURL} alt="" />}
                </div>
                <div className="info">
                    <span>{email.split('@')[0]}</span>
                    <span>{`@${email.split('@')[1]}`}</span>
                </div>
            </div>}
            <div className="bot-sec">
                <Link to="/update">Account Settings</Link>
                <Link to="/create">Create blog</Link>
               {user && <Link to={`/author/${user.uid}`}>BlogList</Link>}
                <a style={{cursor: 'pointer'}}
                 onClick ={logout}>Log out</a>
            </div>
        </div>
     );
}
 
export default ProfileDropDown;