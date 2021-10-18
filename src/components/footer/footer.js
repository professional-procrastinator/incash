import {React,useState} from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useHistory,
    Link } from 'react-router-dom';

import "../stylesheets/footer.css";

const Footer = () => {
    return(
        <div id='footer'>
            <div id='inCashLinks'>
                <h2 className='linkHeading'>InCash</h2>
                <a href='' className='firstLink'>
                    About Us
                </a>
                <a href=''>
                    The Team
                </a>
            </div>

            <div id='helpLinks'>
                <h2 className='linkHeading'>Help</h2>
                <a href='' className='firstLink'>
                    Help Center
                </a>
                <a href=''>
                    InCash Forums
                </a>
            </div>
        </div>
    )
}
export default Footer;