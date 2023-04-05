import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Compound } from "./compund"
import { NpsCalculator } from "./NPScalc"

export const DashBoard=()=>{
  const navigate=useNavigate()
  const [showCompound,setshowCompound]=useState(false)
  const [showNPS,setshowNPS]=useState(false)
    return(
        <div className="dashboard">
             <nav className="navbar navbar-expand-md navbar-dark bg-dark">
            <a className="navbar-brand" href= "# ">DashBoard</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarsExampleDefault">
            <ul className="navbar-nav mr-auto"  >
                <li className="nav-item"><a className="nav-link" href="# " onClick={()=>{navigate("/")}} >Logout</a></li>
            </ul>
            </div>
        </nav>
            <main role="main" class="container mt-5">
                <div class="container">
                    <div class="text-center mt-5">
                        <h3>Dashboard page</h3>
                        <p class="text-bold " >Hi User</p>
                        <input type="submit" className="ctr-center"  onClick={()=>{navigate("/news")}}  value="Get Latest News" />
                        <br/>
                        <br/>
                        <input type="submit" className="ctr-center"  disabled={showNPS} onClick={()=>{setshowCompound(true)}}  value="Coumpound Calculator" />
                        <br/>
                        <br/>
                        <input type="submit" className="ctr-center"  disabled={showCompound} onClick={()=>{setshowNPS(true)}}  value="NPS Calculator" />
                         <br/>
                         <br/>
                         {showNPS?<NpsCalculator/>:null}
                        <br/>
                         {showCompound?<Compound/>:null}
                        <br/>
                        <br/>
                        <br/> 
                    </div>       
               </div>
            </main>
            <a href="https://codeclimate.com/github/RajSekar2002/RestAPI/maintainability"><img src="https://api.codeclimate.com/v1/badges/5785a6ac39d208065f62/maintainability" /></a>
      </div>
    )
    
}