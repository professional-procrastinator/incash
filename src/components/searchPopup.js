import React,{useState,useEffect} from 'react';
import "./stylesheets/searchPopup.css"


import TransactionPopup from './transactionPopup'

import TransactionIcon from "./img/transaction.svg";
import {weekday,month} from "../classes/dateManagement"

const SearchPopup = (props) => {
    const contentArray = props.contentArray;
    const [searchValue, setSearchValue] = useState("");
    const [searchResult, setSearchResult] = useState([]);

    const [isTransactionPopupOpen,setIsTransactionPopupOpen]= useState(false);
    const [transactionPopupDetails,setTransactionPopupDetails]= useState([]);

    useEffect(() => {
        if(searchValue==""){
            setSearchResult([]);
            //document.getElementById('search-popup-section-expenses-results').innerText = ""
        }

    

        for(var i =0; i<contentArray.length; i++){
            if(contentArray[i][0].name.toUpperCase().includes(searchValue.toUpperCase()) && searchValue!=""){
                if(!searchResult.includes(contentArray[i][0])){setSearchResult([...searchResult, contentArray[i][0]]);}
                continue;
            }
        }
        
       
       
       /* else{
           
           if(searchResult.find(t => t[0].name.toUpperCase().includes(searchValue.toUpperCase())) == undefined){
               setSearchResult([...searchResult,contentArray.find(t => t[0].name.toUpperCase().includes(searchValue.toUpperCase()))]);

           }else{
               setSearchResult([]);
           }
           
       }
       */
    },[searchValue]);

    const handleKey = (e) =>{
        if(e.keyCode==27){
            setSearchValue("");
            setSearchResult([]);
            props.set(false)
        }

    }
    if(!props.open){
        return null;
    }
    return(

        <div className='search-popup-back'>
            <div className="search-popup" onKeyDown={(evt)=>{handleKey(evt)}}>
                <div className="search-popup-top">
                    <input className='search-popup-searchbar' value={searchValue} onChange={(evt)=>{setSearchValue(evt.target.value)}} placeholder='Search for any transaction...' />
                    
                    <i className='material-icons' id='searchPopupSearchIcon'>search</i>
                </div>

                <div className="search-popup-content" style={{display:searchValue == "" ? 'flex':'none'}} onKeyDown={(evt) => handleKey(evt)} tabIndex="0">
                    <div className="search-popup-content-guide">
                         <div className="search-popup-content-guide-item">
                            <span className="iconify search-popup-content-guide-item-icon" data-icon="bi:arrow-down-square-fill" style={{color:'rgb(148, 172, 146)'}}></span>
                            <span className="iconify search-popup-content-guide-item-icon" data-icon="bi:arrow-up-square-fill" style={{color:'rgb(148, 172, 146)'}} ></span>
                            <p className='search-popup-content-guide-item-text'>navigate</p>
                        </div>
                        
                        <div className="search-popup-content-guide-item">
                            <span className="search-popup-content-guide-item-icon-text" >ENTER</span>
                            <p className='search-popup-content-guide-item-text'>select</p>
                        </div>

                        <div className="search-popup-content-guide-item">
                            <span className="search-popup-content-guide-item-icon-text" >ESC</span>
                            <p className='search-popup-content-guide-item-text'>close</p>
                        </div>

                       
                    </div>
                </div>

                <div className='search-popup-result-content' style={{display:searchValue != "" ? 'flex':'none'}} onKeyDown={(evt) => handleKey(evt)} tabIndex="0">
                    <div className='search-popup-section' id='navigationSection'>
                        <div id='search-popup-section-expenses-results'>
                            
                            <h2 className='search-popup-section-heading' style={{display:searchResult.length !=0 ? 'flex':'none'}}>EXPENSES</h2>
                            {
                                searchResult.map((transaction)=>{
                                    if(transaction.type == "expense"){
                                        
                                        return(
                                            <div className='search-popup-section-result-div' onClick={(evt)=>{
                                                setTransactionPopupDetails([transaction.name,transaction.type,transaction.amount,transaction.date,transaction.details,transaction.id])
                                                setIsTransactionPopupOpen(true)}}>
                                                <span className="iconify search-popup-section-result-icon" data-icon="fluent:channel-28-filled"></span>
                                                
                                                <div className='search-popup-section-result-div-text'>
                                                    <p className='search-popup-section-result-name'>{transaction.name}</p>
                                                    <p className='search-popup-section-result-date'>{weekday[new Date(transaction.date).getDay()]}, {month[new Date(transaction.date).getMonth()] } {new Date(transaction.date).getDate()} </p>
                                                </div>
                                            </div>
                                        )
                                    }
                                })
                                
                            }
                        </div>
                        
                        
                        <div id='search-popup-section-incomes-results'>
                            
                            <h2 className='search-popup-section-heading' style={{display:searchResult.length !=0 ? 'flex':'none'}}>INCOMES</h2>
                            {
                                searchResult.map((transaction)=>{
                                    if(transaction.type == "income"){
                                        
                                        return(
                                            <div className='search-popup-section-result-div' onClick={(evt)=>{
                                                setTransactionPopupDetails([transaction.name,transaction.type,transaction.amount,transaction.date,transaction.details,transaction.id])
                                                setIsTransactionPopupOpen(true)}}>
                                                 <span className="iconify search-popup-section-result-icon" data-icon="fluent:channel-28-filled"></span>
                                                
                                                <div className='search-popup-section-result-div-text'>
                                                    <p className='search-popup-section-result-name'>{transaction.name}</p>
                                                    <p className='search-popup-section-result-date'>{weekday[new Date(transaction.date).getDay()]}, {month[new Date(transaction.date).getMonth()] } {new Date(transaction.date).getDate()} </p>
                                                </div>
                                            </div>
                                        )
                                    }
                                })
                                
                            }
                        </div>

                    </div>
                            
                    <div className='search-popup-no-results' style={{display:searchResult.length ==0 ? 'flex':'none'}}>
                            <span className="iconify search-popup-no-results-icon" data-icon="ant-design:exclamation-circle-filled"></span>
                            <p className='search-popup-no-results-text'>No results found</p>
                        </div>

                        <TransactionPopup open={isTransactionPopupOpen} setOpen={setIsTransactionPopupOpen} details={transactionPopupDetails}/>
                </div>
            </div>
        </div>
    )

}

export default SearchPopup;

/*
                            <img src={TransactionIcon} className='search-popup-section-action-icon'/>*/