import { React, useState, useEffect } from 'react';
import { app } from "../../services/firabase-config";
import { useParams } from 'react-router-dom';
import { getFirestore, getDoc, doc /*, collection, getDocs, setDoc, docs, query, where*/ } from "firebase/firestore";


export const Item = () => {

    const { id } = useParams();
    const [item, setItem] = useState([]);
    //const [descricao, setDescricao] = useState({});
    //const [msm, setMsm] = useState(null);

    useEffect(() => {
        (async () => {
            const db = getFirestore(app)
            const queryReq = doc(db, "list", id);
            const result = await getDoc(queryReq)

            setItem(result.data().item)
            console.log(result.data().item)
        })();
    }, [id]);
    
    return(
        <div className="container-fluid mt-2">
            <ul className="list-group">
            {
                item.map(i => (
                    <li className="list-group-item" key={ 0 + 1 }>
                        <input className="form-check-input me-2" type="checkbox" value="" id="firstCheckbox"/>
                        <label className="form-check-label" htmlFor="firstCheckbox">{ i.descricao }</label>
                    </li>
                ))
            }  
            </ul> 
        </div>
    )
    
}