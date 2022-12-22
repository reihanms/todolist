import React, {useState, createContext} from 'react'

export const AuthContext = createContext()

export const AuthProvider = (props) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const loginSuccess = () => setIsAuthenticated(true)
    const loginFailed = () => {
        localStorage.removeItem("token")
        setIsAuthenticated(false)
    } 
    const logout = () => {
        localStorage.removeItem("token")
        setIsAuthenticated(false)
    } 
    return(
        <AuthContext.Provider value={{ isAuthenticated, loginSuccess, loginFailed, logout }}>
            {props.children}
        </AuthContext.Provider>
    )
}