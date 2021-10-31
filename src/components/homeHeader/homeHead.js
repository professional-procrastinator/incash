import SideNavBar from "../header/sidenav"
import {React,useState,useEffect} from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useHistory,
    useLocation,
    Link } from 'react-router-dom';

import "../stylesheets/homeHead.css"

import googleLogo from "../../pages/img/GLogo.svg"

const Header = () => {

const [userImage, setUserImage] = useState(null);
const [accountPopupOpen,setAccountPopupOpen] = useState(false);
const [name,setName] = useState("");
const [email,setEmail] = useState("");


const urlParams = new URLSearchParams(useLocation().search);
  
async function getUserDetails(token){ 

  
    fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${token}`)
    .then(res => {
        if (res.status >= 400) {
          window.localStorage.removeItem('id_token');
          window.location.href = "http://localhost:3000/"
        }
        return res.json();
      })
      .then(account => {
        setUserImage(account['picture']);
        setName(account['name']);
        setEmail(account['email']);
      })
  
      
}
  

useEffect(()=>{
    const token = urlParams.get('auth');
    if(token==""||token==null||token==undefined){
      if(window.localStorage.getItem('id_token')== null || window.localStorage.getItem('id_token')== "" || window.localStorage.getItem('id_token')== undefined){
        
        
      
        
          window.location.href = "http://localhost:3000/"
          return
      }else{
      var localToken = window.localStorage.getItem('id_token');
      

      getUserDetails(localToken)
      
    }
      
    }else{
      window.localStorage.setItem('id_token',token)
      window.location.href = "http://localhost:3000/home"
    }
    
  },[])
    

    return(
        <Router>
        <header className='topHeader'>
            <header className='mainHeaderHome'>
                <SideNavBar />
                <div className='mainLogo2'>

                    <h2>
                        <Link to="/" style={{textDecoration:'none',color:'black'}}>
                            InCash
                        </Link>
                    </h2>
                        
                </div>

                <div className='navLinks'>
                    <h2 className='headerLinks' id='activeTabLink'>
                        <Link to="/" style={{textDecoration:'none',color:'black'}}>
                            Home
                        </Link>
                    </h2>
                    <h2 className='headerLinks'>
                        <Link to="/" style={{textDecoration:'none',color:'black'}}>
                            Transactions
                        </Link>
                    </h2>
                    <h2 className='headerLinks'>
                        <Link to="/" style={{textDecoration:'none',color:'black'}}>
                            Notes
                        </Link>
                    </h2>
                    <h2 className='headerLinks'>
                        <Link to="/" style={{textDecoration:'none',color:'black'}}>
                            Settings
                        </Link>
                    </h2>
                    
                

                </div>
                <div id='userDiv'>
                    <img id='userImg' style={{border:accountPopupOpen?'1px solid #87FC5D':'1px solid #2A2A2A'}} src={userImage} onClick={(evt)=>{setAccountPopupOpen(true)}}/>
                </div>

                
               
            </header>
             
            <div id='accountDiv' style={{opacity:accountPopupOpen?1:0}}>
                
                <img id='popupPfp' src={userImage}></img>
                <h2 id='popupName'>{name}</h2>
                <p id='popupEmail'>{email}</p>

                <button id='popupLogoutBtn' onClick={(evt)=>{window.signOut()}}>Logout</button>
                

                <a id='popupLink' onClick={(evt)=>{alert('rukja page nahi banaya hai abhi ')}}>Your Account</a>
                   
                
            </div>
        </header>
        </Router>
    );
}
export default Header;