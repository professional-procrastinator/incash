import {React,useState} from "react";


function SideNavBar() {

        const [open,setOpen] = useState(false);

        if(!open){

                return <button onClick={event => {setOpen(true)}} className="openSNBbtn">&#9776;</button>
        }
        else {

                return (
                    <div>
                        <div className="navBar" style={{}}>
                            <button onClick={event => {setOpen(false)}}>&times;</button>
                            <a href="/">Home</a>
                            <a href="/start">Transactions</a>
                            <a href="/account">Account</a>
                        </div>
                    </div>
                )
        }



}



export default SideNavBar;