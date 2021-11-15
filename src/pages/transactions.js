import React,{useState,useEffect} from 'react';
import OutsideClickHandler from 'react-outside-click-handler/build/OutsideClickHandler';
import {useLocation} from "react-router-dom";

import Header from "../components/homeHeader/homeHead";
import "./stylesheets/transactions.css";

import TransactionPopup from '../components/transactionPopup'
import SearchPopup from '../components/searchPopup'

import { weekday,month } from '../classes/dateManagement';


const TransactionsPage = ()=>{
    const [tabIndex,setTabIndex] = useState(0);
    const [transactions,setTransactions] = useState([]);
    const [token,setToken] = useState();

    
    const [newTransactionPopupTabIndex,setNewTransactionPopupTabIndex] = useState(0);

    const [addTransactionOpen,setAddTransactionOpen] = useState(false);
    const [isTransactionPopupOpen,setIsTransactionPopupOpen] = useState(false);

    const [transactionPopupDetails,setTransactionPopupDetails] = useState([])

    const [newTransName,setNewTransName] = useState("");
    const [newTransAmount,setNewTransAmount] = useState("");
    const [newTransDate,setNewTransDate] = useState("");
    const [newTransDetails,setNewTransDetails] = useState("");
    

    const [isSearchPopupOpen,setIsSearchPopupOpen] = useState(false);


    
    const urlParams = new URLSearchParams(useLocation().search);
    


    async function addTransaction(){
        if(newTransName==""||newTransAmount==""||newTransDate==""){
            return;
        }

        var dateParts = newTransDate.split("-");
        // month is 0-based, that's why we need dataParts[1] - 1
        var dateObject = new Date(+dateParts[0], dateParts[1] - 1, +dateParts[2]); 
       
        const response = await fetch("http://localhost:5000/addTransaction",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Content-Type": "application/json",
                'token': token
            },
            body:JSON.stringify({
                name:newTransName,
                amount:newTransAmount,
                date:dateObject.toString(),
                details:newTransDetails,
                type:newTransactionPopupTabIndex
            })
        });
        window.location.reload()
        const data = await response.json();
        console.log(data)
        setAddTransactionOpen(false);
        
    }

    
    async function getExpenses(expenseToken){
        const response = await fetch(`http://127.0.0.1:5000/getExpenses`, {
          method: "GET",
  
          headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json",
              'token': expenseToken
          },
          
      })
  
      const data = await response.json();
      var key,val;
      let transactionsList = [];
      var finalList = [];
      for([key, val] of Object.entries(data)) {
        transactionsList.push(val);
        var transList = Object.keys(transactionsList).map((key) => [Number(key), transactionsList[key]]);
        finalList.push(transList[key][1]);
      }
      
      setTransactions(finalList);
    }
    useEffect(()=>{
        const authToken = urlParams.get('auth');
        if(authToken==""||authToken==null||authToken==undefined){
          if(window.localStorage.getItem('id_token')== null || window.localStorage.getItem('id_token')== "" || window.localStorage.getItem('id_token')== undefined){
            
            
          
            
              window.location.href = "http://localhost:3000/"
              return
          }else{
          var localToken = window.localStorage.getItem('id_token');
          
          setToken(localToken);
          
          getExpenses(localToken);
        }
          
        }else{
          window.localStorage.setItem('id_token',authToken)
          
          setToken(authToken);
          
          getExpenses(authToken);
          window.location.href = "home"
        }

    },[])
    

    var invalidChars = [
        "-",
        "+",
        "e",
    ];

    return(
        <div id="transactions-page">
            <Header/>

            <div id='mainTransactions'>
                <h2 id='transactionHeading'>Transactions</h2>
                <i className='material-icons' id='searchTransBtn' onClick={(evt)=>{setIsSearchPopupOpen(true)}}>search</i>
                <i className='material-icons' id='addTransBtn' onClick={(evt)=>{setAddTransactionOpen(true)}}>add</i>
            

            </div>
            <div id='transactionTabs'>
                <div className='transaction-tab' id={tabIndex==0?'activeTransactionTab':''} onClick={(evt)=>{setTabIndex(0)}}>
                    Expenses
                </div>
                <div className='transaction-tab' id={tabIndex==1?'activeTransactionTab':''} onClick={(evt)=>{setTabIndex(1)}}>
                    Incomes
                </div>
            </div>
            <div className='addTransPopupBack' style={{display:addTransactionOpen ? 'flex':'none'}}>
                <div id='addTransPopup' className='slide-in' >
                    <OutsideClickHandler onOutsideClick={()=>{setAddTransactionOpen(false)}}>
                        <div id='mainTabExpenseDiv'>
                            <div id='tabExpense' className='slide-in-2'>
                            <div id='addTransPopupHeader'>
                            <h2 id='transactionPopupHeading'>Add Transaction</h2>
                            </div>
                            <div id='addTransPopupTabs'>
                            <div id='transactionTabs'>
                                    <div className='transaction-tab' id={newTransactionPopupTabIndex==0?'activeTransactionTab':''} onClick={(evt)=>{setNewTransactionPopupTabIndex(0)}}>
                                        Expense
                                    </div>
                                    <div className='transaction-tab' id={newTransactionPopupTabIndex==1?'activeTransactionTab':''} onClick={(evt)=>{setNewTransactionPopupTabIndex(1)}}>
                                        Income
                                    </div>
                                </div>
                            </div>
                            <div id='addTransInputDiv'>
                                <input id='addTransInputName' value={newTransName} onChange={(evt)=>{setNewTransName(evt.target.value)}} className='addTransPopupInput' placeholder='Name'></input>
                                <input id='addTransInputAmount' value={newTransAmount} onChange={(evt)=>{setNewTransAmount(evt.target.value)}} className='addTransPopupInput' onInput={(evt)=>{evt.target.value = evt.target.value.replace(/[e\+\-]/gi, "")}} onKeyDown={(evt)=>{if (invalidChars.includes(evt.key)) {evt.preventDefault();}}} placeholder='Amount' type='number'></input>
                                <input id='addTransInputDate' value={newTransDate} onChange={(evt)=>{setNewTransDate(evt.target.value)}} type='date' className='addTransPopupInput' placeholder='Date'></input>

                                <textarea id='addTransInputDetails' value={newTransDetails} onChange={(evt)=>{setNewTransDetails(evt.target.value)}} className='addTransPopupInput' placeholder='Details'></textarea>
                            </div>
                            <div id='addTransPopupBottomRow'>
                                <a>Help</a>
                                <div id='addTransPopupButtonRow'>
                                    <button id='cancelButton' className='addTransPopupButton' onClick={(evt)=>{setAddTransactionOpen(false)}}>Cancel</button>
                                    <button id='saveButton' className='addTransPopupButton' onClick={(evt)=>{addTransaction()}}>Save</button>
                                </div>
                            </div>
                            
                            </div>
                        </div>  
                    </OutsideClickHandler> 
                </div>
            </div>

            <SearchPopup open={isSearchPopupOpen} set={setIsSearchPopupOpen} contentArray={transactions} />
            <TransactionPopup open={isTransactionPopupOpen} setOpen={setIsTransactionPopupOpen} details={transactionPopupDetails}/>
            {transactions.map((transaction)=>{


                if(tabIndex==0){
                    
                    if(transaction[0].type=="expense"){
                        return(
                        <div id='transactionContainerDIV' onClick={(evt)=>{
                            setTransactionPopupDetails([transaction[0].name,transaction[0].type,transaction[0].amount,transaction[0].date,transaction[0].details,transaction[0].id]);
                            
                            setIsTransactionPopupOpen(true)}}>
                        <div id='transTextDIV'> 
                        <div className="NameTrans">{transaction[0].name}</div>
                            
                            <div className="amountTrans">- ${transaction[0].amount}</div>
                            </div>
                            
                            <div className='dateTrans'>{weekday[new Date(transaction[0].date).getDay()]}, {month[new Date(transaction[0].date).getMonth()] } {new Date(transaction[0].date).getDate()} </div>
                        </div>
                        )
                    }
                
                }else{
                    if(transaction[0].type=="income"){

                        return(
                            <div id='transactionContainerDIV' onClick={(evt)=>{
                                setTransactionPopupDetails([transaction[0].name,transaction[0].type,transaction[0].amount,transaction[0].date,transaction[0].details,transaction[0].id])
                                setIsTransactionPopupOpen(true)}}>
                            <div id='transTextDIV'> 
                            <div className="NameTrans">{transaction[0].name}</div>
                                
                                <div className="amountTrans">+ ${transaction[0].amount}</div>
                                </div>
                                
                                <div className='dateTrans'>{weekday[new Date(transaction[0].date).getDay()]}, {month[new Date(transaction[0].date).getMonth()] } {new Date(transaction[0].date).getDate()} </div>
                            </div>
                        )
                    }

                }

                })
            }
        </div>
    )
}



export default TransactionsPage;

/*
<select defaultValue="Sort By" id='transSortBySelect'>
                    <option value='0'>Recent</option>
                    <option value='1'>Amount</option>
</select>

*/