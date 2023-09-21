import { createContext,useContext,useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
const AuthContext = createContext(null)

export const AuthProvider=({children})=>{
    const [user,setUser] = useState(()=>{
        return localStorage.getItem('user')
    })
    const [emailDetails,setEmailDetails] = useState(()=>{
        return localStorage.getItem('details')
    })

    const login=(user=>{
       if(user){
          localStorage.setItem('user',JSON.stringify(user))
       }
    })
    const logout= ()=>{
        localStorage.removeItem('user')
    }
    const verify =(details)=>{
    if(details){
    localStorage.setItem('details',JSON.stringify(details))
    }
    }
    return(
        <AuthContext.Provider value={{user,verify,login,logout,emailDetails}}>{children}</AuthContext.Provider>
    )
}
export const useAuth = ()=>{
    return(
        useContext(AuthContext)
    )
}