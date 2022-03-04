import logo from '../../images/logo.webp';
import profile from '../../images/profile.jpg';
import {useRef} from 'react';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ProfileDropDown from './profileDropDown';
import { auth } from '../../firebaseConfig';
import { useAuth } from '../../contexts/authContext';

const NavBar = () => {
    const modal =React.createRef();
    const modal_content = React.createRef();
    const profileDropDown = useRef(null)
    const user  = useAuth()
    const navigate = useNavigate()

    const handleModalVisibility = () => {modal.current.style.display="block";}
    const handleFadeIn = () => {modal.current.style.display="none";}
    window.onclick = function(event) {
        if (event.target == modal.current) {
            modal.current.style.display="none";
        }
       
            if(event.target.nodeName !== "IMG" && event.target !== profileDropDown.current 
            && profileDropDown.current.style.display === "flex"){
                profileDropDown.current.style.display = "none"
            
            }
    }

      const handleDropDown = (e) =>{
        e.preventDefault();
        profileDropDown.current.style.display = profileDropDown.current.style.display !== "flex" ?"flex" : "none"
      }

      // redirect user when search for something
      const handleSearch  = (e) =>{
          e.preventDefault()
          const keyword = e.target[1].value
          if(keyword){
          navigate(`/search/${keyword}`)
          }
          else navigate('/search/')
      }
    return ( 
    <nav className="top-nav">
     <div className="container">
        <div className="logo">
            <a href="">
           { <img src={logo} alt="" />}
            </a>
        </div>  
        <div className="links" >
            <Link exact to="/">Home</Link>
            <Link to="/posts">Posts</Link>
            <Link to="/authors">Authors</Link>
            <a href="">Conatct us</a>
        </div>
      

        <div className="search">
          <form onSubmit={(e)=>handleSearch(e)}>
            <button type="submit" ><i className="fa fa-search"></i></button>
            <input type="text" name="" placeholder="Search " />
          </form>
          
         {user && 
         <ul>
              <li>
                  <a href=""><i className="fa fa-bookmark"></i></a>
              </li>
              <li>
                  <a href=""><i className="fa fa-bell"></i></a>
              </li>
              <li>
                  <a onClick={e =>handleDropDown(e)}><img src={user.photoURL} alt="" /></a>
              </li>
          </ul>}
          {!user && <ul>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign up</Link>
          </ul>}
          <div className="responsive-links" id="links" onClick={handleModalVisibility}>
              <span></span>
              <span></span>
              <span></span>
          </div>
        </div>
        
      </div>
      <div className="modal" ref={modal} >
            <div className="mobileLinks" ref={modal_content}>
                <div className="modal-header">
                    <div className="logo">
                        <img src={logo} alt="" />
                    </div>
                    <span className="close" onClick={handleFadeIn}>&times;</span>
                </div>
                <Link exact to="/">Home</Link>
                <Link to="/posts">Posts</Link>
                <Link to="/authors">Authors</Link>
                <a href="">Conatct us</a>
            </div>
     </div>
     <ProfileDropDown profileDropDown={profileDropDown || {}}/>
    </nav>
    
    


     );
}
 
export default NavBar;