import {React,useState,useEffect} from "react";
import {useLocation} from "react-router-dom";
import helloWave from "./img/hello_wave.svg";
import Stats from '../classes/stats'

import "./stylesheets/home.css";

import Header from "../components/homeHeader/homeHead"
var invalidChars = [
  "-",
  "+",
  "e",
];

function Home() {
  const [name,setName] = useState('')
  const [budget,setBudget] = useState("");
  const [BudgetPopupTabIndex,setBudgetPopupTabIndex] = useState(0)

  const [income,setIncome] = useState(0)
  const [saveGoal,setGoal] = useState(0)
  const [err,setErr] = useState("");
  const [popupValid,setPopupValid] = useState(false)

  const urlParams = new URLSearchParams(useLocation().search);
  

  async function getUserDetails(token,setName,setBudget){ 

  
    fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${token}`)
    .then(res => {
        if (res.status >= 400) {
          window.localStorage.removeItem('id_token');
          window.location.href = "https://incash.netlify.app/"
        }
        return res.json();
      })
      .then(account => {
        console.log(account['name'])
        try{setName(account['name']);}
        catch(err){
          
        }
      })
  
      
  }
  
  
  async function getBudget(token,setBudget){
  
    const response = await fetch(`https://incashbackend.herokuapp.com/getBudget`, {
          method: "GET",
  
          headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json",
              'token':token
          },
          
      })
  
      const data = await response.json()
      try{
        setBudget(data[0]['income']);
      }
      
      catch(err){
        
      }
  }
  

  useEffect(()=>{
    const token = urlParams.get('auth');
    if(token==""||token==null||token==undefined){
      if(window.localStorage.getItem('id_token')== null || window.localStorage.getItem('id_token')== "" || window.localStorage.getItem('id_token')== undefined){
        
        
      
        
          window.location.href = "https://incash.netlify.app/"
          return
      }else{
      var localToken = window.localStorage.getItem('id_token');
      

      const res =  getUserDetails(localToken,setName,setBudget)
      .then(()=>{
        getBudget(localToken,setBudget);
      })
    }
      
    }else{
      window.localStorage.setItem('id_token',token)
      window.location.href = "https://incash.netlify.app/home"
    }
    
  },[])
    

    function validateIncome() {
      if(income == ""){
        if(err==""){
          setErr('Your income and saving goal must be valid.');

          setTimeout(function(){ setErr('') }, 3000);
          return;
        }else{
          return;
        }
      }
      setBudgetPopupTabIndex(BudgetPopupTabIndex+1)
    }

    function validateGoal(){
      if(saveGoal>=income){
        setErr("Your saving goal can't be more than or equal to your income.")
        setTimeout(function(){ setErr('') }, 3000);
          return;
      }
      sendStats()
    }
    
    async function sendStats(){
      const statToSend = new Stats(window.localStorage.getItem('id_token'),income,saveGoal);
    
      const response = await fetch(`https://incashbackend.herokuapp.com/setStats`, {
            method: "POST",
    
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
            },
            body:JSON.stringify(statToSend)
        })
    
        const data = await response.json()
    }
    
  
   if(budget!=0){return (
    <div className="Home">
      <Header></Header>

      <div id='remBudgetDIV'>
            <h2 className='remBudgetHead'>Remaining Budget</h2>
            <h2 className='remBudgetVal'>${budget}</h2>
      </div>

      
      
    </div>
  );
  }else{
    return(
      <div className="Home">
      <Header></Header>

      <div id='remBudgetDIV'>
            <h2 className='remBudgetHead'>Remaining Budget</h2>
            <h2 className='remBudgetVal'>${budget}</h2>
      </div>

      
    
    <div id='setBudgetBackPop' style={{display: budget==0 ? 'flex' : 'none' }}>
        <div id='setBudgetPop' className='slide-in' >
          <div id='tab1' className='slide-in-2'  style={{display:BudgetPopupTabIndex==0 ? 'flex':'none'}}>
            <div id='popupImgText'>
                      <img src={helloWave} id='helloWaveImg'/>
                      <h2>Welcome, {name}!</h2>
                      <p id='popupDesc'>Start off by entering your income and choose a saving goal.</p>
            </div>    

            <div id='inputDiv' >
                  <input className='setStatsInput' onChange={(evt)=>{setIncome(evt.target.value)}} onInput={(evt)=>{evt.target.value = evt.target.value.replace(/[e\+\-]/gi, "")}} onKeyDown={(evt)=>{if (invalidChars.includes(evt.key)) {evt.preventDefault();}}} placeholder="Your Income" type='number'/>
                
                  
                  <div className='nextBtn' onClick={(evt)=>{validateIncome()}}>
                      Next
                  </div>
                  <div id='errorText' style={{display:err!="" ? 'flex':'none'}}><i className='fa fa-exclamation-circle'></i><p>{err}</p></div>

            </div>
          </div>

          <div id='tab2' className='slide-in-2'  style={{display:BudgetPopupTabIndex==1 ? 'flex':'none'}}>
              <div id='popupImgText'>
                          <img src={helloWave} id='helloWaveImg'/>
                          <h2>Welcome, {name}!</h2>
                          <p id='popupDesc'>Now, choose a saving goal.</p>
                </div>    

                <div id='inputDiv' >
                  
                      <input className='setStatsInput' onChange={(evt)=>{setGoal(evt.target.value)}} onInput={(evt)=>{evt.target.value = evt.target.value.replace(/[e\+\-]/gi, "")}} onKeyDown={(evt)=>{if (invalidChars.includes(evt.key)) {evt.preventDefault();}}} placeholder="Saving Goal" type='number'/>
                    
                    <div id='mainLinksPopupBudget'>
                      <div className='backBtn' onClick={(evt)=>{setBudgetPopupTabIndex(0)}}>
                          Back
                      </div>
                      <div className='goBtn' onClick={(evt)=>{validateGoal()}}>
                          Go
                      </div>

                    </div>
                    <div id='errorText' style={{display:err!="" ? 'flex':'none'}}><i className='fa fa-exclamation-circle'></i><p>{err}</p></div>
                </div>
              
              </div>


        </div>
      </div>
      </div>
    )
  }
  
}





export default Home;

// <input className='setStatsInput' placeholder="Saving Goal" type='number' onInput={(evt)=>{evt.target.value = evt.target.value.replace(/[e\+\-]/gi, "")}} onKeyDown={(evt)=>{if (invalidChars.includes(evt.key)) {evt.preventDefault();}}}/>

