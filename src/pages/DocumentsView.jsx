import React from "react";
import { useNavigate } from "react-router-dom";
import firebaseConfig from "../resources/FirebaseConfig";
import { getAuth, signOut,onAuthStateChanged } from "firebase/auth";
import { getStorage, ref, uploadBytes, listAll } from "firebase/storage";
import { getFirestore,doc,getDoc, getDocs, where,query,collection } from "firebase/firestore";



const documents_view = () => {
    return (
        <div>
            <h1>Documents View</h1>
        </div>
    );
};

export default documents_view;


