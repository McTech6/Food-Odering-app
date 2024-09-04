import React, { useState } from "react";
import './login.css'
import { assets } from "../../assets/frontend_assets/assets";

const Login = ({setShowLogin}) => {
    const [currentState, setCurrentState] =  useState("Sign up")
  return <div className="login-popup"> 
   <form   className="login-popup-container">
      <div className="login-popup-title">
         <h2>{currentState}</h2> 
         <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
      </div>
      <div className="login-popup-input">
      {currentState==="Login"?<></>: <input type="text" placeholder="Enter your name" required />}
       
        <input type="email" placeholder="Enter your email" required />
        <input type="password" placeholder="Enter Password" required />
      </div>
      <button>{currentState==="Sign up"?"Create account":"Login"}</button>
      <div className="login-popup-condition">
       <input type="checkbox" required />
       <p>By continuing, i agree to the terms of use & privacy policy</p>
      </div>
      {currentState==="Login"? <p>Create a new account? <span onClick={()=>setCurrentState("Sign up")}>Click Here</span> </p>:
        <p>Already have an account? <span onClick={()=>setCurrentState("Login")}>Click Here</span> </p>
      }
      
      
   </form>
  </div>;
};

export default Login;
