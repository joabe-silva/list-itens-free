import { React, useState } from 'react';
import { app } from "../../services/firabase-config";
import { getFirestore, collection, getDocs } from "firebase/firestore";

export const MyLists = () => {

    const [list, setList] = useState([]);
    
    async function getList() {
        const db = getFirestore(app)
        const querySnapshot = await getDocs(collection(db, "list"));

        console.log(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        setList(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }

    return(
    
        <div className="container mt-5"> 
            <div className="col">
                <div className="row">
                    <h2 className="text-center">My List</h2>
                    <div className="d-grid gap-2 d-md-block text-center">
                        <button className="btn btn-outline-primary m-2" type="button" onClick={ getList }>Pessoal</button>
                        <button className="btn btn-outline-secondary m-2" type="button">Compartilhada</button>
                    </div>
                </div>
                <div className="row text-center">
                    <div className="container">
                    {
                        list.map(l => (
                            <div className="card m-2" key={ l.id }>
                                <div className="card-body">
                                    { l.descricao }
                                </div>
                            </div>
                        ))
                    }
                    </div>
                    
                </div>
            </div>   
        </div>
        
    )
    
}