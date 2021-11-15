import React,{useState,useEffect} from 'react';
import {useLocation} from "react-router-dom";


import { weekday,month } from '../classes/dateManagement';

const TransactionPopup = (props) => {
    const [isLoading,setIsLoading] = useState(false);
    const [token,setToken] = useState();
    const [transactionId,setTransactionId] = useState();


    
    const urlParams = new URLSearchParams(useLocation().search);
    
    useEffect(()=>{
        const authToken = urlParams.get('auth');
        if(authToken==""||authToken==null||authToken==undefined){
          if(window.localStorage.getItem('id_token')== null || window.localStorage.getItem('id_token')== "" || window.localStorage.getItem('id_token')== undefined){
            
            
          
            
              window.location.href = "http://localhost:3000/"
              return
          }else{
          var localToken = window.localStorage.getItem('id_token');
          
          setToken(localToken);
          
        }
          
        }else{
          window.localStorage.setItem('id_token',authToken)
          
          setToken(authToken);
          
          window.location.href = "home"
        }
        
        setTransactionId(props.details[5]);

    })

    async function deleteTransaction(){
        setIsLoading(true);
        const response = await fetch("http://localhost:5000/deleteTransaction",{
            method:"GET",
            headers:{
                'token': token,
                'transactionid':transactionId
            }
        });
        const data = await response.json();
        setIsLoading(false);
        window.location.reload()
    }



    return(
        
        <div className='addTransPopupBack' style={{display:props.open ? 'flex':'none'}}>
        <div id='transactionDetailPopup' style={{display:props.open?'flex':'none'}}>
            <div className='transactionDetailPopupTopRow'>
                <p className='popupTopRowHeading'>Transaction</p>
                <i className='material-icons' id='closePopupBtn' onClick={(evt)=>{props.setOpen(false)}}>clear</i>
            </div>
            <div id='popupSeparator'></div>

            <div className='popupMainContent'>
                <h2 className='transactionPopupHeading'>{props.details[0]}</h2>
                <p className='transactionPopupDate'>{weekday[new Date(props.details[3]).getDay()]}, {month[new Date(props.details[3]).getMonth()] } {new Date(props.details[3]).getDate()} </p>

                <p className='transactionPopupAmount'
                 style={{color:props.details[1]=='expense'?'var(--appleRed)':'var(--jungleGreen)'}}>
                     {props.details[1]=='expense'? `- $${props.details[2]}`:`+ $${props.details[2]}`}
                     
                </p>
                <p className='transactionPopupDetails'>{props.details[4]}</p>
            </div>

            <div className='popupBottomRow'>
             
                <i className='material-icons' id='editTransactionBtn' disabled={isLoading}>edit</i>
                <i className='material-icons' id='deleteTransactionBtn' disabled={isLoading} onClick={(evt)=>{deleteTransaction()}}>delete</i>
               
                <i className='material-icons' id='settingsTransactionBtn' disabled={isLoading}>settings</i>

              

            </div>
        </div>
        </div>
    )

}

export default TransactionPopup;