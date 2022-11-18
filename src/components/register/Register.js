import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ValidateInfo from '../common/ValidateInfo'
import "./register.css"

const Register = () => {
  const navigate = useNavigate()

  const initialState = {
    fullname: "",
    email: "",
    mobileNo: "",
    cpassword: "",
    rpassword: "",
    username : ""
  }
  const [state, setState] = useState(initialState)
  const [errors, setErrors] = useState({})


  const { fullname, email, mobileNo, cpassword, rpassword,username } = state


  const onChangeHandler = (e) => {
    const { value, name } = e.target;
    setState({ ...state, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
   
    setErrors(ValidateInfo(state))
    // navigate('/login')
    if(fullname&& email&& mobileNo && cpassword &&rpassword) {
      navigate('/login')
       setState(initialState)
    }
  }


  return (
    <div className="containers">
      <div className="card bg-light">
        <article className="card-body mx-auto" style={{ maxWidth: 400 }}>
          <h4 className="card-title mt-3 text-center">Create Account</h4>
          <form onSubmit={handleSubmit}>
            {/* <div className="form-group input-group">
              <div className="input-group-prepend">
                <span className="input-group-text"> <i className="fa fa-user" /> </span>
              </div>
              <input className="form-control" name='fullname' value={fullname} placeholder="Full name" type="text" autoComplete='off' onChange={onChangeHandler} />
            </div>
            {errors.fullname && <p className='form_error'>{errors.fullname}</p>} */}
            <div className="form-group input-group">
              <div className="input-group-prepend">
                <span className="input-group-text"> <i className="fa fa-user" /> </span>
              </div>
              <input className="form-control" name='username' value={username} placeholder="userName" type="text" autoComplete='off' onChange={onChangeHandler} />
            </div>
            {errors.username && <p className='form_error'>{errors.username}</p>}
            <div className="form-group input-group">
              <div className="input-group-prepend">
                <span className="input-group-text"> <i className="fa fa-envelope" /> </span>
              </div>
              <input className="form-control" name='email' value={email} placeholder="Email address" type="email" autoComplete='off' onChange={onChangeHandler} />
            </div>
            {errors.email && <p className='form_error'>{errors.email}</p>}
            <div className="form-group input-group">
              <div className="input-group-prepend">
                <span className="input-group-text"> <i className="fa fa-phone" /> </span>
              </div>
              <input className="form-control" name='mobileNo' value={mobileNo} placeholder="Phone number" type="text" autoComplete='off' onChange={onChangeHandler} />
            </div>
            {errors.mobileNo && <p className='form_error'>{errors.mobileNo}</p>}
            <div className="form-group input-group">
              <div className="input-group-prepend">
                <span className="input-group-text"> <i className="fa fa-lock" /> </span>
              </div>
              <input className="form-control" name='cpassword' value={cpassword} placeholder="Create password" type="password" autoComplete='off' onChange={onChangeHandler} />
            </div>
            {errors.cpassword && <p className='form_error'>{errors.cpassword}</p>}
            <div className="form-group input-group">
              <div className="input-group-prepend">
                <span className="input-group-text"> <i className="fa fa-lock" /> </span>
              </div>
              <input className="form-control" name='rpassword' value={rpassword} placeholder="Repeat password" type="password" autoComplete='off' onChange={onChangeHandler} />
            </div>
            {errors.rpassword && <p className='form_error'>{errors.rpassword}</p>}
            <div className="form-group">
              <button type="submit" className="btn btn-primary btn-block"> Create Account</button>
            </div>
            <p className="text-center authLink" onClick={() => navigate("/login")}>Have an account? <a>Log In</a> </p>
          </form>
        </article>
      </div>
    </div>
  )
}

export default Register