import { React, useState, useEffect } from 'react';
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from "../../services/firabase-config";

export const MyLists = () => {

    const [list, setList] = useState([]);

    useEffect(() => {
        (async () => {
            const db = getFirestore(app)
            const querySnapshot = await getDocs(collection(db, "list"));
    
            console.log(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
            setList(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        })();
    }, []);
    
    return(
        <div className="container-fluid mt-5">
            <ul className="list-group">
            {
                list.map(l => (
                    <div className="list-group-item list-group-item-action" key={ l.id }>
                        <div className="d-flex w-100 justify-content-between">
                            <h5 className="mb-1">{ l.descricao }</h5>
                        </div>
                        <small className="text-muted">joabesilva@gmail.com</small>
                    </div>
                ))
            }  
            </ul> 
        </div>
    )
    
}