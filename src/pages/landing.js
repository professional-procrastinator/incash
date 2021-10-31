import React from "react";
import Header from "../components/header/header";
import Footer from "../components/footer/footer";
import "./stylesheets/landing.css";
import topIllust from "./img/topIllustration.svg";
import googleLogo from "./img/GLogo.svg"

const Landing = ()=>{
    return(
        <div id='land'>

            <div id='main'>
                <Header />
            </div>

            <div id='landing'>
                
                <div id='land1'>
                    
                <img src={topIllust} className='leftIll'></img>
                    <div id='landText1' className='landTextDiv'>
                        <h2 className='topHeading'>InCash</h2>
                        
                        <img src={topIllust} className='middleIll'></img>
                        <p className='topText'>Set a saving goal. Track your expenses. Save money the smart way.</p>
                       
                       
                        <div id='signInBtn'>
                            <div  className="g-signin2" data-onsuccess="onSignIn">
                                
                            </div>
                        </div>
                        <button id='signOut' >Sign Out</button>
                        <a href='learnMore'>Learn more</a>
                        
                        

                    </div>
                </div>
            </div>
        
            <div id='bottomMain'>
                <Footer />
            </div>
        </div>
    )
}


export default Landing;