import { useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import React, { useState } from 'react'
import FacebookLogin from 'react-facebook-login';
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getUserData } from '../../redux/slices/googleSlice'
import { setAuth } from '../../redux/slices/navBarSlice'
import ValidateInfoLogin from '../common/ValidateInfoLogin';

const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()


    const initialState = {
        username : "",
        password : ""
    }

    const [state,setState] = useState(initialState)
    const [errors,setErrors] = useState({})


    const onChangeHandler = (e) => {
        const {value,name} = e.target;
        setState({...state, [name] : value})
      }
    
    const login = useGoogleLogin({

        onSuccess: async response => {
            try {
                const res = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
                    headers: {
                        Authorization: `Bearer ${response.access_token}`
                    }
                })
                const data = res.data
                dispatch(getUserData(res.data))
                dispatch(setAuth(true))
                localStorage.clear()
                // localStorage.setItem("gUserData",data)
                localStorage.setItem(
                    "auth_data",
                    JSON.stringify(data)
                );
                localStorage.setItem("gToken", response.access_token)
                if (res.data.email_verified) {
                    navigate("/")
                }
            } catch (err) {
                console.log(err);
            }
        },
    });
    const responseFacebook = (res) => {
        console.log("response",res)
    }

    const ComponentClick = (data) => {
        console.log(data)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setErrors(ValidateInfoLogin(state))
        localStorage.clear()
        
        if(state.username && state.password && errors) {
            dispatch(setAuth(true))
            navigate("/")
            localStorage.setItem("username" , state.username)
        }
    }
    return (
        <div className="containers">
            <div className="card bg-light">
                <article className="card-body mx-auto" style={{ maxWidth: 400 }}>
                    <h4 className="card-title mt-3 text-center">Login Account</h4>
                    <p style={{ color: "white" }}>
                        <span className="btn btn-block " onClick={login}> <i className="fab fa-google" /> &nbsp; Login via Google</span>
                        <FacebookLogin
                            appId="675108894320261"
                            autoLoad={true}
                            fields="name,email,picture"
                            onClick={ComponentClick}
                            callback={responseFacebook}
                            cssClass="btn btn-block btn-facebook"
                            icon="fa-facebook"
                        />
                    </p>
                    <p className="divider-text">
                        <span className="bg-light">OR</span>
                    </p>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"> <i className="fa fa-envelope" /> </span>
                            </div>
                            <input className="form-control" value={state.username} placeholder="username" type="text" name='username' autoComplete="false" onChange={onChangeHandler} />
                        </div>
                            <p className='text-danger form_error'>{errors.username}</p>
                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"> <i className="fa fa-lock" /> </span>
                            </div>
                            <input className="form-control" value={state.password} placeholder="password" type="password" name='password' onChange={onChangeHandler} />
                        </div>
                        <p className='text-danger form_error'>{errors.password}</p>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary btn-block"> Login Account</button>
                        </div>
                        <p className="text-center authLink" onClick={() => navigate("/signup")}>Have a not account? <a>Sign Up</a> </p>
                    </form>
                </article>
            </div>
        </div>
    )
}

export default Login