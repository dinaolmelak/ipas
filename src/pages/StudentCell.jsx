import React from "react";
import {useState} from "react";
import DocList from "./DocList";

const StudentCell = ({studentInfo}) => {
    const [currentStudentView, setCurrentStudentView] = useState(null);

    return (
        <div>
            <div>
            <h3>{studentInfo.firstName} {studentInfo.lastName}</h3>
            <h4>{studentInfo.email}</h4>
            <button onClick={()=>{
                console.log("Viewing documents");
                console.log(studentInfo);
                
                
                setCurrentStudentView(studentInfo);
                
            }}>View Documents</button>
            </div>
            <div>
                {
                    currentStudentView !== null ? <DocList userInfo={studentInfo}/> : null
                }
            </div>
            
        </div>
    )
}

export default StudentCell;