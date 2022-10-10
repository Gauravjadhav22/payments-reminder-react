//search bills by fullname
//profile pic, time 
import "./Header&footer.css"
import { useContext, useEffect } from "react"
import AuthContext from "../context/AuthContext"
import axios from "../api/axios"
import { GrSearch } from 'react-icons/gr'
import { BiLogOut, BiNotification, BiUser } from "react-icons/bi"
import React from 'react'
import { useState } from "react"
import { useMediaQuery } from 'react-responsive'
import useLogout from '../hooks/useLogout'
import { Link, NavLink } from "react-router-dom"
import useAuth from "../hooks/useAuth"

const Header = () => {
  const [toggle, setToggle] = useState(false)
  const { auth, setAuth } = useAuth()


  const logout = useLogout()

  useEffect(() => {
    return () => {

    }
  }, [auth])







  const toggleNav = () => {
    setToggle(!toggle)
  }
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 800px)' })

  const Nav = () => {
    return (
      <>
        {auth?.accessToken ? (
          <>
            <div className="searchbar">
              <input type="text" placeholder="Search here" />
              <GrSearch className="search-icon" />
            </div>
            <div className="user">
              <span onClick={() => {
                logout()
              }} ><BiLogOut className="logout" /> </span>

              <Link to='/profile' className="pro-icon-main" style={{ color: "black", marginLeft: "5px", marginRight: "5px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <BiUser className="pro-icon" />
                <h4>username</h4>

              </Link>
              <div className="bellMain">
                <BiNotification className="bell" />
              </div>
            </div>
          </>
        )
          : <>


            {!auth?.accessToken && <div>
              <NavLink to='/register' style={{ marginRight: "34px", marginBottom: "5px", padding: "8px", backgroundColor: "yellow", borderRadius: "55px" }}>Sign Up</NavLink>
              <NavLink to='/' style={{ marginRight: "34px", marginBottom: "5px", padding: "8px", backgroundColor: "yellow", borderRadius: "55px" }}>Sign In</NavLink>
            </div>}

          </>

        }




      </>
    )
  }

  return (
    <div className="main-header">

      {!toggle ? <div className="toggle" onClick={toggleNav}>
        <span />
        <span />
        <span />
      </div> :
        <div className="toggle2" onClick={toggleNav}>
          <span />
          <span />
          <span />
        </div>
      }
      <NavLink to='/' className="h1">Bills Reminder App</NavLink>

      {isTabletOrMobile ? <>{toggle && <Nav />}</> : <Nav />}

    </div>
  )
}

export default Header