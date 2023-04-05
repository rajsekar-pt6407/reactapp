import {  useState } from "react"
export const Compound= ()=>{
    const [amount,setamount]=useState({
        totalAmt:"",
        interest:"",
        totaltrade:""
    })
    const [Total,settotal]=useState(0)
    const handleChange=(event)=>{
         setamount({...amount,[event.target.name]:event.target.value})    
    }
    const calculation=()=>{  
        var total=parseInt(amount.totalAmt);
        for(let i=0;i<parseInt(amount.totaltrade);i++){
                 total=total+(total*(parseInt(amount.interest)/100))
        }
        settotal(Math.round(total));
    }
    return(
        <div className="comp-div">
            <label id="label1" > Investment Amount</label> <span>&#36;</span>
            <input type="number" onChange={handleChange} name="totalAmt"/>
            <label> Interest Rate</label> 
            <input  id="label1" type="number" onChange={handleChange} name="interest"/><span>&#37;</span> 
            <label> Total Trades</label> 
            <input  id="label1" type="number" onChange={handleChange} name="totaltrade"/>
            <br/> 
            <br/>
            <button id="submitID" onClick={calculation}> Calculate</button>
            <br/>
            <br/>
            <label id="label1">Total Profits</label>  <span>&#36;</span> 
            <input value={Total}/>
        </div>
    )
}