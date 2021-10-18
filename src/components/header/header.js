import SideNavBar from "./sidenav"
import {React,useState} from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useHistory,
    Link } from 'react-router-dom';

import "../stylesheets/header.css"

const Header = () => {
    return(
        <Router>
        <header className='topHead'>
            <header className='mainHeader'>

                <div className='mainLogo'>

                    <h2>
                        <Link to="/" style={{textDecoration:'none',color:'black'}}>
                            Incash
                        </Link>
                    </h2>
                        
                </div>
    
            </header>
        </header>
        </Router>
    )
}
export default Header;