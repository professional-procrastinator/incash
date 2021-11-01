import React,{useState} from 'react';
import expenses from "./stylesheets/expenses.css";

const Transactions = (props)=>{
    const [token,setToken] = useState(props.token);

    return(
        <div id="transactions">
            <h2 id='recTransHead'>Recent Transactions</h2>
            
        </div>
    )
}
export default Transactions;