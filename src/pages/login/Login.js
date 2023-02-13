import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext'
import { axiosRequest } from '../../hooks/axios';
import './login.scss'
function Login() {
    const [credentials, setCredentials] = useState({
        username: undefined,
        password: undefined
    })
    const { user,loading, error, dispatch } = useContext(AuthContext);
    const navigate =useNavigate();
    const handleChange = (e) => {
        setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }));
    };
    const handleClick = async (e) => {
        e.preventDefault();
        dispatch({ type: "LOGIN_START" })
        try {
            const res = await axiosRequest.post('/auth/login', credentials,{
                headers: { 'Content-Type': 'application/json' },

            });
            const access_token = res.data.token;

            //save token to authenticate
            sessionStorage.setItem("access_token", access_token);
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data })
            console.log(res)
            navigate('/')
        } catch (error) {
            dispatch({ type: "LOGIN_FAILURE",payload:error.response.data.message})
            // console.log(error.response.data)


        }
    }
    // console.log(user)
    return (
        <div className='login'>
            <h1>Login </h1>
            <div className="loginContainer">
                <input type="text" placeholder='' id='username' onChange={handleChange} className='loginInput' />
                <input type="password" placeholder='' id='password' onChange={handleChange} className='loginInput' />
                <button disabled={loading} onClick={handleClick} className='loginButton'>LOGIN</button>
                {error &&

                    <div className='loginError'>{error}</div>
                }
            </div>
        </div>
    )
}

export default Login