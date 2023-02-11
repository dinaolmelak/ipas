import {React, useState, useEffect} from "react";
import firebaseConfig from "../resources/FirebaseConfig";
import {getFirestore, collection, query, where, getDocs} from "firebase/firestore";
import StudentCell from "..//StudentCell";

const infoStorageKey = "ipas_info";

const DSODash = ({profileInfo, signOutFunc}) => {
    const [studentList, setStudentList] = useState(null);

    const addToStudentList = (newStudent) => {
        setStudentList((prevStudentList) => {
            return {...prevStudentList, ...newStudent};
        });
    };
    useEffect(() => {
        const storedData = localStorage.getItem(infoStorageKey);
        if(studentList || !storedData){
            return;
        }
        const parsedData = JSON.parse(storedData);
        if(parsedData){
            setStudentList(parsedData);
        }
        
    }, [studentList]);

    useEffect(() => {
        const getListOfStudents = async () => {
            if(studentList){
                return;
            }
            const db = getFirestore(firebaseConfig);
            const studentRef = collection(db, "users");
            const q = query(studentRef, where("isStudent", "==", true));
            const querySnapshot = await getDocs(q);
            
            let newVar = {}
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                newVar[doc.id] = doc.data();
            });
            addToStudentList(newVar);
            localStorage.setItem(infoStorageKey, JSON.stringify(studentList));
        };
        getListOfStudents();

    }, []);
    
    return (
        <div>
            <h1>DSO Dashboard {profileInfo.firstName}</h1>
            <h3>List of all students:</h3>     
            <br></br>   
            {
                
                <ul>
                    {
                        
                        studentList && Object.keys(studentList).map((key) => {
                        return <li key={key}>
                                <StudentCell studentInfo={studentList[key]} />
                            </li>
                        }) 
                        
                    }
                
                </ul>
            
                
            }
                
               
            
            <button className="sign-out-button" onClick={signOutFunc}>Sign Out</button>
        </div>
    );
}

export default DSODash;