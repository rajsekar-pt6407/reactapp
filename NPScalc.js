import { useState } from "react"

export const NpsCalculator=()=>{
    const [allow,setallow]=useState(false)
    const [TotalMaturity,setTotalMaturity]=useState(0)
    const [interestEarn,setintrestEarn]=useState(0)
    const [totalInvestMent,settotalInvestMent]=useState(0)
    const [usersdata,setuserdata]=useState({
                investmentAmount:"",
                interest:"",
                age:""
    })
    const handlechange=(event)=>{

        setuserdata({...usersdata,[event.target.name]:event.target.value})
    
    }
    const HandleTrigger=()=>{
        if(parseInt(usersdata.age)<18){
            setallow(true)
    }
    else{
        setallow(false)
        calculators()
    }
    }
    const calculators=()=>{
        const INVESTMENTAMOUNT=parseInt(usersdata.investmentAmount)
        const INTEREST=parseInt(usersdata.interest)
        const CURRENTAGE=parseInt(usersdata.age)
        const RETIREMENTAGE=60
        const AgetoRetirement=RETIREMENTAGE-CURRENTAGE
        let TotalGains=0;
        let TotalInvest=INVESTMENTAMOUNT*12*AgetoRetirement;
        for(let i=0;i<AgetoRetirement;i++){
            TotalGains +=INVESTMENTAMOUNT*12
            TotalGains += (TotalGains*(INTEREST/100))

        }
        setintrestEarn(Math.round(TotalGains-TotalInvest))
        settotalInvestMent(TotalInvest)
        setTotalMaturity(Math.round(TotalGains))
    }
            return(
                <div className="nps-div-calc">
                     <h3 className="nps-h2-calc">NPS Calculator</h3>
                     <br/>
                     <div  class="Nps-cal">
                        <label id="label1"> Monthly Investment </label>    <span>&#8377;</span>
                        <input type="number" id="calc-spacehandle" onChange={handlechange} name="investmentAmount" />
                        <br/>
                        <label id="label1"> Intrest Rate </label>
                        <input type="number"  id="calc-spacehandle" onChange={handlechange} name="interest" /><span>&#37;</span>
                        <br/>
                        <label id="label1"> Age </label>
                        <input type="number" id="calc-spacehandle" onChange={handlechange} name="age"  placeholder="Enter Above 18"/>
                        <br/>
                        {allow?<span>Age Must Above 18</span>:null}
                        <br/>
                        <button id="submitID"   onClick={HandleTrigger}> Calculate</button>
                     <br/>
                     <br/>
                     <div className="maturity">
                     <label id="label2"> Total Investment</label>   <span>&#8377;</span>
                     <input name="Totalinvest" id="calc-ans" value={totalInvestMent} />
                     <br/>
                     <label id="label2"> Interest Earn</label>   <span>&#8377;</span>
                     <input name="Totalinterest" id="calc-ans" value={interestEarn} />
                     <br/>
                     <label id="label2"> Total Maturity Value</label>   <span>&#8377;</span>
                     <input name="TotalMaturity" id="calc-ans" value={TotalMaturity} />
                     </div>
                </div>
                </div>
            )
}