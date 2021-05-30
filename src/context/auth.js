import React, { useState, createContext } from 'react'
import { useHistory } from 'react-router-dom'

export const AuthContext = createContext()

export const AuthProvider = (props) => {
    const [isAuthenticated, setAuth] = useState(false)
    const history = useHistory()

    const loginSuccess = () => {
        setAuth(true)
    }

    const loginFailed = () => {
        localStorage.removeItem("token")
        setAuth(false)    
    }
    
    const logout = () => {
        localStorage.clear()
        // setAuth(false)    
        history.push("/")
    }

    return(
        <AuthContext.Provider value={{isAuthenticated, loginSuccess, loginFailed, logout}} >
            {props.children}
        </AuthContext.Provider>
    )
}
