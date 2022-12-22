import React, {useState, useContext} from 'react'
import { AuthContext } from '../context/auth'

import { Navigate } from 'react-router-dom'
import Button from '../components/Button'
import Input from '../components/Input'
import axios from 'axios'
const baseUrl = "https://express-postgress-server-production.up.railway.app/api/v1"

const Auth = () => {
    const {isAuthenticated, loginSuccess, loginFailed} = useContext(AuthContext)

    const [login, setLogin] = useState(true)
    const [loading, setLoading] = useState(false)

    const [error, setError] = useState("")
    const [isError, setIsError] = useState(false)

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const isLogin = () => setLogin(!login)

    const userLogin = async() => {
        setLoading(true)
        const user = {
            email, password
        }
        try {
            const res = await axios.post(`${baseUrl}/user/signin`, user)
            localStorage.setItem("token", res.data.token)
            setEmail("")
            setPassword("")
            setLoading(false)
            loginSuccess()
        }
        catch(err){
            console.log(err)
            setIsError(true)
            setError(err.response.data.message)
            setLoading(false)

            setTimeout(() => {
                setIsError(false)
                setError("")
                loginFailed()
            }, 3000);
        }
    }
    const userRegister = async() => {
        setLoading(true)
        const user = {
            name, email, password
        }
        try {
            const res = await axios.post(`${baseUrl}/user/signup`, user)
            localStorage.setItem("token", res.data.token)
            setName("")
            setEmail("")
            setPassword("")
            setLoading(false)
            loginSuccess()
        }
        catch(err){
            setIsError(true)
            setError(err.response.data.errors)
            setLoading(false)

            setTimeout(() => {
                setIsError(false)
                setError("")
                loginFailed()
            }, 6000);
        }
    }

    if(isAuthenticated) {
        return <Navigate to='/task' />
    }

  return (
    <div style={box}>
        {isError && (
            <div>
                {error && <p style={{color:'red'}}>{error}</p>}
            </div>
        )}
        <h3 style={head}>{login ? 'Login' : 'Register'}</h3>
        <div style={{display : 'block'}}>
            {!login && (<Input value={name} type="text" placeholder="name" change={(e) => setName(e.target.value)} />)}
            <Input value={email} type="email" placeholder="email" change={(e) => setEmail(e.target.value)}/>
            <Input value={password} type="password" placeholder="password" change={(e) => setPassword(e.target.value)} />
        </div>
        <div style={btn}>
            <Button load={loading} variant='primary' text={login ? 'Login' : 'Register'} action={login ? userLogin : userRegister}/>
        </div>
        <div style={paragraph}>
            {login ? (
            <>
            <p>Dont have an account? <span onClick={isLogin} style={textBtn}>Register Now!</span></p>
            </>) : 
            (<>
            <p>Already have an account? <span onClick={isLogin} style={textBtn}>Login Now!</span></p>
            </>)}
            
        </div>
    </div>
  )
}

export default Auth

const box = {
    background : "#fff",
    width : "25%",
    position : 'absolute',
    top : '50%',
    left : '50%',
    transform : 'translate(-50%,-50%)',
    padding : '0.7rem'
}

const head = {
    textAlign : 'center',
    marginBottom : '0.4rem',
}
const btn = {
    textAlign : 'center',
    marginTop : '0.5rem',

}
const paragraph = {
    textAlign : 'center',
    marginTop : '0.5rem',
    fontSize : '14px',
}
const textBtn = {
    color : '#57ea4f',
    fontSize : '15px',
    cursor : 'pointer'
}