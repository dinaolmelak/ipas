import React, { useState, useEffect} from "react";
// Import the functions you need from the SDKs you need
import { useNavigate } from "react-router-dom";

import firebaseConfig from "./resources/FirebaseConfig";
import { getFirestore, setDoc,doc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
import { getAuth, createUserWithEmailAndPassword} from "firebase/auth";
// TODO: import { getFirestore, doc, setDoc } from "firebase/firestore";



const auth = getAuth(firebaseConfig);
const db = getFirestore(firebaseConfig);


const SignUp = () => {
  const navigate = useNavigate();
  const [isSignIn, setIsSignIn] = useState(false);
  //const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.
  useEffect(() => {
    if(isSignIn){
        console.log("isSignIn: " + isSignIn);
        window.location.href = "/dashboard?isStudentDash={isStudent}";
    }
  }, [isSignIn]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [jNumber, setJNumber] = useState("");
  const [isStudent, setIsStudent] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const storeInFirestore = async (accountUserId, emailInput,firstName,lastName,jNumber,isStudent) => {
        //const docRef = collection(db, "users")
        try{
            await setDoc(doc(db, "users", accountUserId),{
                firstName: firstName,
                lastName: lastName,
                jNumber: jNumber,
                isStudent: Boolean(isStudent),
                email: emailInput,
                userId: accountUserId
            });
            console.log("Document written with ID: " + accountUserId);
            setIsSignIn(true);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
        
    }
  const handleSignUp = async (email,password,confirmPassword) => {
    console.log("Sign Up with email and password button clicked!");
    console.log(email + " " + password + " " + confirmPassword);
    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        //const user = userCredential.user;
        console.log("User created successfully!");
        storeInFirestore(userCredential.user.uid, email,firstName,lastName,jNumber,isStudent);
        return userCredential.user.uid;
      })
      .catch((error) => {
        //const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        alert(errorMessage);
        return;
      });
  }

  return (
    <div className="parent-container">
      
        {
          <div className="form">
            <h1 >Sign Up</h1>
            <input className="field" autoComplete="off" value={firstName} onChange={(e)=>setFirstName(e.target.value)} type="text" placeholder="First Name" />
            <input className="field" autoComplete="off" value={lastName} onChange={(e)=>setLastName(e.target.value)} type="text" placeholder="Last Name" /><br></br>
            <input className="field" autoComplete="off" value={jNumber} onChange={(e)=>setJNumber(e.target.value)} type="digit" placeholder="J00" />
            <br></br>
            <h2>Are you a student? </h2>
            <label> <span> 
              <input autoComplete="off" value={isStudent} onChange={(e)=>setIsStudent(e.target.value)} type="checkbox" />
              </span>
               Yes, I am a student</label><br></br>
            <br></br>
            <input className="field" autoComplete="off" value={email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="Email" />
            <input className="field" autoComplete="off" value={password} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="Password" />
            <input className="field" autoComplete="off" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} type="password" placeholder="Confirm Password" />
            <br></br>
            <br></br>
            <button className="button2" onClick={
              () => {
                handleSignUp(email,password,confirmPassword);
              }
            }>Sign Up</button>
            
            <button className="button3" onClick={
              () => {
                navigate("/signin");
              }
            }>Already have an account? Sign In</button>
            <br></br>
            <br></br>

            <button className="button3" onClick={
              () => {
                navigate({ pathname: '/'});
              }
            }>Back to Home</button>

          </div>
        }
      {
        //isSignedIn ? <p>Sign Out</p> : <p>Sign In</p>
      }
    </div>
  );
};

export default SignUp;