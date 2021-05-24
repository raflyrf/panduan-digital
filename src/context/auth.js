import React, { useState, createContext } from 'react'


export const AuthContext = createContext()

export const AuthProvider = (props) => {
    const [isAuthenticated, setAuth] = useState(false)
    
    const loginSuccess = () => setAuth(true)    
    
    const loginFailed = () => {
        localStorage.removeItem("token")
        setAuth(false)    
    }
    
    const logout = () => {
        localStorage.removeItem("token")
        setAuth(false)    
    }
    return(
        <AuthContext.Provider value={{isAuthenticated, loginSuccess, loginFailed, logout}} >
            {props.children}
        </AuthContext.Provider>
    )
}
