import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LocalData } from './LocalStorage';
import {apiCalls} from'./axiosAPI';
import './RegisterUI.css';
export const Registers=()=>{
    const navigate=useNavigate();
    const [errorhandle]=useState({
      emailError:false,
      nameError:false,
      passwordError:false,
      phoneError:false
    })
    const [loading,setloading]=useState(false)
    const [customError,SeterrorChecker]=useState(false)
    const [inputs,setinputs]=useState({
        name:"",
        email:"",
        password:"",
        phonenumber:"",
    })
    const handleChange=(event)=>{
          event.preventDefault();
          let intialerror=errorhandle;
          let checker=1  
          if(inputs.name===""){
            intialerror.nameError=true
            checker=0 
            setloading(true)
          }
          if(inputs.email===""){
            intialerror.emailError=true
            checker=0 
            setloading(true)  
          }
          if(inputs.password===""){
            intialerror.passwordError=true  
            checker=0   
            setloading(true)
          }
          
          if(inputs.phonenumber===""){
            intialerror.phoneError=true 
            checker=0  
            setloading(true)
          }
          if(checker){ 
            try{
            apiCalls(inputs)
            .then((response)=>{
             return LocalData(response)})
            .catch(err=>console.log(err))
             navigate("/dashboard");
            }
            catch(err){
              console.log(err);
              SeterrorChecker(true)
            }
          }
    }
    const handleinput=(event)=>{

      setloading(false)
      errorhandle.emailError=false
      errorhandle.nameError=false
      errorhandle.phoneError=false
      errorhandle.passwordError=false
      setinputs({...inputs,[event.target.name]:event.target.value})
    }

     return(
        <section className="register-block">
            <div className="container">
               <div className="row ">
                  <div className="col register-sec">
                     <h2 className="text-center">Register  Here</h2>
                     <form className="register-form" onSubmit={handleChange} action="" >
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1" className="text-uppercase">Name</label>
                        <input type="text" className="form-control" name="name"onClick={()=>{if(inputs.name===""){errorhandle.nameError=true}}}  onChange={handleinput} id=""/>
                        {errorhandle.nameError ?<span className="text-danger" >
                            Name is required.
                        </span>:null}
                        </div>
                        <div className="form-group">
                        <label htmlFor="exampleInputEmail1" className="text-uppercase">Email</label>
                        <input type="text"  className="form-control" name="email" onClick={()=>{if(inputs.email===""){errorhandle.emailError=true}}} onChange={handleinput} id="" />
                        {errorhandle.emailError?<span className="text-danger" >
                            Email is required.
                        </span>:null}
                        </div>
                        <div className="form-group">
                        <label htmlFor="exampleInputPhonenumber1" className="text-uppercase">phone number</label>
                        <input  className="form-control" type="phonenumber"  name="phonenumber"onClick={()=>{if(inputs.phonenumber===""){errorhandle.phoneError=true}}} onChange={handleinput} id="" />
                        { errorhandle.phoneError ? <span className="text-danger">
                            Phone Number is required
                        </span>:null
                        }
                        </div>
                        <div className="form-group">
                        <label htmlFor="exampleInputPassword1" className="text-uppercase">Password</label>
                        <input  className="form-control" type="password"  name="password" onClick={()=>{if(inputs.password===""){errorhandle.passwordError=true}}} onChange={handleinput} id="" />
                        {errorhandle.passwordError ? <span className="text-danger" >
                            Password is required.
                        </span>:null
                        }
                        </div>
                        <div className="form-group">
                        {customError?<span className="text-danger">
                           custom Errors found 
                        </span>:null}
                        {loading ? <div  className="text-center">
                        <div className="spinner-border text-primary " role="status">
                           <span className="sr-only">Loading...</span>
                          </div>
                          </div>:null}
                        <input type="submit" className="btn btn-login float-right"  disabled={loading} value="Register" />
                        </div>
                        <div className="clearfix"></div>
                        <div className="form-group">
                        Already have account ? Please <a href="# " onClick={()=>{navigate("/Login")}}>Login</a>
                       </div>
                     </form>
                  </div>
               </div>
           </div>
        </section>

      )
     }

