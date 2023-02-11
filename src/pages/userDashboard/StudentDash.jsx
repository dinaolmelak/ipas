import {React} from "react";
import {getStorage, ref, uploadBytes} from "firebase/storage";
import firebaseConfig from "..//resources/FirebaseConfig";
import DocList from "../DocList";
import "/Users/dinaoltadesse/Desktop/iPAS/ipas_web/src/assets/css/StudentDash.css"


const StudentDash = ({studentInfo, signUserOut}) => {
    
    function onFileChoosen(event) {
        if(event.target.files.length === 0){
            alert("No file selected");
            return;
        }
        const file = event.target.files[0];
        const storage = getStorage(firebaseConfig);
        const storageRef = ref(storage, "studentDoc/" + studentInfo.userId + "/" + file.name);
        
        uploadBytes(storageRef, file).then((snapshot) => {
            alert("File uploaded successfully!, please refresh the page to see the changes");
            console.log("Uploaded a blob or file!" + snapshot.metadata);
        }).catch((error) => {
            console.log(error.message);
        });
        
    };

    if(studentInfo === null){
        return(
            <div>
                <h1>Student Dash Loading...</h1>
            </div>
        );
    }
    return (
        <div>
                <>
                <h1>Welcome To Your Student Dashboard {studentInfo.firstName}</h1>
                <p>Please upload your documents here. The DSO will be able to view all your documents</p>
                
                
                <DocList userInfo={studentInfo}/>
                <br></br>
                <br></br>
                <br></br>
                <input className="buttonDownload" type="file" onChange={onFileChoosen}></input>
                <br></br>
                <br></br>
                <button className="sign-out-button" onClick={signUserOut}>Sign Out</button>
                </>
        </div>
    );
    
};

export default StudentDash;