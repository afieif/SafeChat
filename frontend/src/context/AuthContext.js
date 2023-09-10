import React, { useContext, useState , useEffect} from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';

const AuthContext = React.createContext();

export function useAuth(){
    return useContext(AuthContext)
}

export function AuthProvider({children}) {
    const [user,setUser] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        })

        return () => unsubscribe;
        
    }, [])

    const value = {
        user 
    }

  return (
  <AuthContext.Provider value={value}>
    {!loading && children}
  </AuthContext.Provider>
  );
}