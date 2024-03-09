import React from 'react'
import '../styles/Header.scss';
import {Link } from 'react-router-dom';
import {useSelector} from 'react-redux'
export default function Header() {

    const {currentUser}=useSelector(state=>state.user)
  return (
   <>
   <div className="header_container">
      <div className="left">
         <h4>DigitalCard Session</h4>
      </div>
      <div className="right">
         <ul>
            <Link>
            <li>Home</li>
            </Link> 
            <Link>
            <li>About</li>
            </Link>
            <Link to='/profile'>
            {currentUser ? <img src={currentUser.profile} alt="profile" /> :    <li>Service</li>}
         
            </Link>
         </ul>
      </div>
   </div>
   </>
  )
}
