import { React, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getFirestore, getDocs, collection, query, where } from 'firebase/firestore';
import { app } from '../../services/firabase-config';

export const ListaArquivada = () => {

    const [list, setList] = useState([]);

    useEffect(() => {
        (async () => {
            const db = getFirestore(app)
            const result = await getDocs(
                query(collection(db, "list"), where("share", "array-contains", sessionStorage.getItem("@AuthFirebase:userEmail")), where("check", "==", true))
            )
            setList(result.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        })();
    });

    return(
        <div className="container-fluid mt-2">
            <h3 className="mt-3">Listas arquivadas</h3>
            <ul className="list-group">
            {
                list.map(l => (
                    <Link to={`/lista/${ l.id }`} key={ l.id } style={{ textDecoration: 'none' }}>
                        <div className="list-group-item list-group-item-action" >
                            <div className="d-flex w-100 justify-content-between">
                                <h5 className="mb-1">{ l.descricao }</h5>
                            </div>
                            <small className="text-muted">{ l.criador }</small>
                        </div>
                    </Link>
                ))
            }  
            </ul> 
        </div>
    )
    
}