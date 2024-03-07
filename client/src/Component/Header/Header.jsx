import React from 'react'
import './Header.scss';
import {NavLink} from 'react-router-dom'
const Header = () => {
  return (
   <>
   <div className="header_component">
   <div className="left_logo">
    <h4>MERNSTACK USER AUTH</h4>
   </div>
   <div className="right_list">
    <ul>
        <NavLink to='/'>
        <li>Home</li>
        </NavLink>
        <NavLink to='/about'>
        <li>About</li>
        </NavLink>
        <NavLink to='/signUp'>
        <li>SignUp</li>
        </NavLink>
    </ul>
   </div>
   </div>
   </>
  )
}

export default Header;

