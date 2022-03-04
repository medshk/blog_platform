import React, { useRef } from 'react';
import { useEffect, useState } from 'react/cjs/react.development';
import { useAuth } from '../../contexts/authContext';
import ChangeInfo from './changeInfo'
import ChangePassword from './changePassword'
import { useForm } from 'react-hook-form';

const UpdateProfile = () => {
    const user = useAuth()
    const [component, setComponent] = useState(<ChangeInfo/>)
    const { register, handleSubmit, setFocus } = useForm();
    
    useEffect(()=>{
        setFocus("info")
    },[setFocus])
    return (
        <div className="updater">
            <div className="holder">
                <ul className='options'>
                    <li><button 
                        {...register("info")}
                        onClick={()=>{setComponent(<ChangeInfo/>)
                            setFocus("info")
                        }}>
                        Edit Profile
                        </button></li>
                    <li><button
                        {...register("pass")} 
                        onClick={()=>{setComponent(<ChangePassword/>)
                            setFocus("pass")
                        }}>
                        Change Password
                        </button></li>
                </ul>
                { user && <div className="flex-container">
                    {component}
                </div>}
           </div>
        </div>
        
    );
}

export default UpdateProfile;
