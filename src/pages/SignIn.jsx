import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// Import the functions you need from the SDKs you need

import firebaseConfig from "./resources/FirebaseConfig";
// TODO: Add SDKs for Firebase products that you want to use
import { getAuth, signInWithEmailAndPassword} from "firebase/auth";

// https://firebase.google.com/docs/web/setup#available-libraries

// Initialize Firebase

const auth = getAuth(firebaseConfig);

const SignIn = () => {
  const navigate = useNavigate();
  const [isSignIn, setIsSignIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  useEffect(() => {
    if(isSignIn){
        console.log("isSignIn: " + isSignIn);
        navigate({ pathname: '/dashboard'});
        window.location.href = "/dashboard";
    }
    
  }, [isSignIn, navigate]);
  
  const handleSignIn = (email,password) => {
    console.log("Sign In button clicked!");
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("User signed in successfully! " + userCredential.user.email);
        setIsSignIn(true);
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.log("Error: " + errorCode+ " " + errorMessage);
        alert(errorMessage);
      });
  }
  

  return (
    <div>
      
        {
          <div className="parent-container">
            <div className="form">
            <h1 className="heading">Sign In</h1>
            <input className="field" autoComplete="off" value={email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="email" />
            <br></br>
            <input className="field" autoComplete="off" value={password} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="Password" />
            <br></br>
            <button className="button1" onClick={
              () => {
                handleSignIn(email,password);
              }
            }>Sign In</button>
            <button className="button3" onClick={
              () => {
                navigate({ pathname: '/signup'});
              }
            }>Don't have an account? Sign Up</button>
            
            <br></br>
            <button className="button3" onClick={
              () => {
                navigate({ pathname: '/'});
              }
            }>Back to Home</button>
            </div>
          </div>
        }
    </div>
  );
};

export default SignIn;
