import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { json, Link, useNavigate } from 'react-router-dom'
import { setAuth, setToggle } from '../../redux/slices/navBarSlice'
import { googleLogout } from '@react-oauth/google';
import "./navbar.css"

const NavBar = () => {

  const auth = useSelector((state) => state.toggle.auth)
  const dispatch = useDispatch();
  const navigate = useNavigate()


  useEffect(() => {
    // dispatch(setAuth(false))
    localStorage.clear()
  },[])

  const user = JSON.parse(localStorage.getItem("auth_data"))

const loginD = localStorage.getItem("username")

  const [isMobile, setIsMobile] = useState(false)
  return (
    <nav className='navbar'>
      <h3 className="logo">logo</h3>
      <ul className={isMobile ? "nav-links-mobile" : "nav-links"} onClick={() => setIsMobile(false)}>
        {auth && (
          <>
            <Link to="/" className='home '>
              <li>Home</li>
            </Link>
            <Link to="/about" className='about'>
              <li>About</li>
            </Link>
            <Link to="/contact" className='admin'>
              <li>Contacts</li>
            </Link></>
        )
        }
        {user &&
          <div className="profile_container">
            <img className='profileImage' src={user.picture} alt="profile Picture" />
            <span className='user_name' >{user.given_name}</span>
          </div>
        }
        {loginD && <p className=' profile_container user'>{loginD}</p>}
        {auth || user ? <button type='text' className='btn auth' onClick={() => {
          dispatch(setAuth(false))
          localStorage.clear()
          navigate("/login")
        }
        } >logout</button> :
          <button type='text' className='btn auth' onClick={() => {
            navigate("/login")
            googleLogout();
          }}>login</button>}
      </ul>
      <button className="mobile-menu-icon" onClick={() => setIsMobile(!isMobile)}>
        {isMobile ? <i className='fas fa-times' /> : <i className='fas fa-bars' />}
      </button>

    </nav>
  )
}

export default NavBar