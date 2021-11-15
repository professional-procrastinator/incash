import React,{useState,useEffect} from 'react';
import {useLocation} from "react-router-dom";
import "./stylesheets/expenses.css";

const Transactions = ()=>{
    const [transactions,setTransactions] = useState([]);
    const [token,setToken] = useState();
    
    const urlParams = new URLSearchParams(useLocation().search);
    
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
    
    
    return(
        <div id="transactionDiv">
            <h2 id='recTransHead'>Recent Transactions</h2>
            
            
            <div className="transaction">
                {transactions.map((transaction)=>{

                if(transactions.indexOf(transaction)>5){
                    return <h2 id='viewMoreExpensesA' onClick={(evt)=>{window.location.href = "transactions"}}>View More</h2>
                }
                    return(
                       <div id='transactionContainer'>
                       <div id='transText'> 
                       <div className="transactionName">{transaction[0].name}</div>
                        
                        <div className="transactionAmount">${transaction[0].amount}</div>
                        </div>
                        <div id='transSeparator' />
                        </div>
                    )
                   
                
                })
                }
                
            </div>
            
        </div>
    )
}
    
export default Transactions;