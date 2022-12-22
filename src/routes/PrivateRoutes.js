import React, {useContext} from "react"

import {Route,Routes, Navigate} from "react-router-dom"
import { AuthContext } from "../context/auth"

const PrivateRoutes = ({children}) => {
    const {isAuthenticated} = useContext(AuthContext)
    return isAuthenticated ? children : <Navigate to="/" />
}

export default PrivateRoutes