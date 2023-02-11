import {React, useEffect, useState} from "react";
import {getStorage, ref, listAll, getDownloadURL, getMetadata} from "firebase/storage";
import firebaseConfig from "./resources/FirebaseConfig"; 

const storageKey = "ipas_storage"; 



const DocList = ({userInfo})  => {
    const [studentDocList, setStudentDocList] = useState(null);
    
    
    const dateOptions = {weekday: "long", year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric", second: "numeric"};
    const readableDate = (inputDate) => {
        const date = new Date(inputDate);
        return date.toLocaleDateString("en-US", dateOptions);
    }
    useEffect(() => {
        if(studentDocList === null){
            const localStorageStudentDocList = JSON.parse(localStorage.getItem(storageKey));
            if(localStorageStudentDocList === null){
                return;
            }
            setStudentDocList(localStorageStudentDocList);
        }

        return;

    }, [studentDocList]);

    useEffect(() => {
        
        const getStudentDocuments = async () => {
            if(userInfo === null){
                return;
            }
            console.log("Getting student documents");
            const storage = getStorage(firebaseConfig);
            console.log(userInfo.userId);
            const storageRef = ref(storage, "studentDoc/" + userInfo.userId);
            const listRef = listAll(storageRef);
            await listRef.then((res) => {
                res.items.forEach((itemRef) => {
                    console.log("itemRef.name");
                    getDownloadURL(ref(storage, itemRef.fullPath)).then((url) => {
                        getMetadata(ref(storage, itemRef.fullPath)).then((metadata) => {
                            setStudentDocList((studentDocList) => {
                                return {...studentDocList, [itemRef.fullPath]: [itemRef.name, url, metadata]};
                            });
                            localStorage.setItem(storageKey, JSON.stringify(studentDocList));
                        });
                    });

                    
                    
                });
            }).catch((error) => {
                console.log(error.message);
                return;
            });
        }
        getStudentDocuments();
        console.log("Student documents retrieved");
        console.log(studentDocList);

    },[]);

    if(studentDocList === null){
        return(
            <div>
                <p>No file uploaded...</p>
            </div>
        );
    }
    return (
        <div>
            {
            studentDocList && Object.entries(studentDocList).map(([key,value]) => (
                <ul key={key}>
                   <h4>
                    <a href={studentDocList[key][1]}> {studentDocList[key][0]}</a>
                    <h5>Uploaded on: {readableDate(studentDocList[key][2].timeCreated)}</h5>
                    </h4> 
                </ul>
            ))
            }
        </div>
    );
}

export default DocList;