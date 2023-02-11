import {React, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import firebaseConfig from "./resources/FirebaseConfig";
import { getAuth, signOut,onAuthStateChanged } from "firebase/auth";
import { getFirestore,doc,getDoc } from "firebase/firestore";
import StudentDash from "./StudentDash";
import DSODash from "./DSODash";


const auth = getAuth(firebaseConfig);
const db = getFirestore(firebaseConfig);

const Dashboard = () => {
    const navigate = useNavigate();
    const [userId, setUserId] = useState(null);
    const [userDocument, setUserDocument] = useState(null);
        
    
    
    const signOutUser = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            window.location.href = "/";
        }).catch((error) => {
            // An error happened.
            console.log(error.message);
        });
    };
    useEffect(() => {
        const getUserInfo = async () => {
            if(userId === null){
                return;
            }
            console.log("Getting user info");
            const userRef = doc(db, "users", userId);
            
            await getDoc(userRef).then((doc) => {
                if (doc.exists()) {
                    setUserDocument(doc.data());
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            }).catch((error) => {
                console.log("Error getting document:", error);
                return;
            });
            
        };
        getUserInfo();
    }, [userId]);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user == null) {
                navigate("/");
                
            }else{
                setUserId(user.uid);
                
            }
        });
        
    }, );

    if(userDocument === null){
        return(
            <div>
                <h1>Loading...</h1>
            </div>
        );
    }

    
    if(userDocument.isStudent === true){
        return (
            <StudentDash studentInfo = {userDocument} signUserOut = {signOutUser}/>
        )
    }
    return (
        <DSODash profileInfo={userDocument} signOutFunc = {signOutUser}/>

    );

};

export default Dashboard;