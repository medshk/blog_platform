import { onAuthStateChanged } from '@firebase/auth';
import React from 'react';
import { useEffect , useState , useContext } from 'react/cjs/react.development';
import { auth } from '../firebaseConfig';

const AuthContext =  React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}
export const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState()

    useEffect(() =>{
        const unsubscribe = onAuthStateChanged(auth, user =>{
            setCurrentUser(user)
        })
        return unsubscribe
    },[])
    return (
       <AuthContext.Provider value={currentUser} >
           {children}
       </AuthContext.Provider>
    );
}


