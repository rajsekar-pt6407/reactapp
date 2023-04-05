import { useState } from "react"
import { useNavigate } from "react-router-dom"
export const Login=()=>{
    const navigate=useNavigate();
    const [loading,setloading]=useState(false)
    const [loginInput,setInput]=useState({
        name:" ",
        password:" "
    })
    const validator=()=>{
        let valid=false;
        const check=JSON.parse(localStorage.getItem("user1"))   
          check.map((users)=>{
            if(users.name===loginInput.name && users.password===loginInput.password ){
                valid=true;
            }
            return true
          });
          return valid;
       
    }
    const handleSubmit=(event)=>{
        event.preventDefault();
        setloading(true)
        if(validator()){
            navigate("/dashboard")
        }
    }
    const handleChange=(event)=>{
      setInput({...loginInput,[event.target.name]:event.target.value})
    }
    return(
        <section className="register-block">
        <div className="container">
           <div className="row ">
              <div className="col register-sec">
                 <h2 className="text-center">Login Here..</h2>
                 <form className="register-form" onSubmit={handleSubmit} action="" >
                    <div className="form-group">
                    <label htmlFor="exampleInputPhonenumber1" className="text-uppercase">UserName</label>
                    <input  className="form-control" type="phonenumber" placeholder="Name is required" name="name" onChange={handleChange} id="" />
                    </div>
                    <div className="form-group">
                    <label htmlFor="exampleInputPassword1" className="text-uppercase">Password</label>
                    <input  className="form-control" type="password" placeholder="Password is required" name="password" onChange={handleChange} id="" />
                    </div>
                    <div className="form-group">
                     { loading? <div  className="text-center">
                        <span onClick={()=>{navigate("/register")}} className="text-danger"> Kindly Register</span>
                        <br/>
                        <div className="spinner-border text-primary " role="status">
                           <span className="sr-only">Loading...</span>
                          </div>
                          </div>:null}
                        <input type="submit" className="btn btn-login float-right" value="Login" />
                        </div>
                 </form>
              </div>
           </div>
       </div>
    </section>
        
    )

}