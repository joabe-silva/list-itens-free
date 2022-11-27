import { React, useState, useEffect } from 'react';
import { getFirestore, collection, getDocs, setDoc, doc, query, orderBy } from "firebase/firestore";
import { app } from "../../services/firabase-config";
import { uuidv4 } from '@firebase/util';

export const Lista = () => {

    const [list, setList] = useState([]);
    const [descricao, setDescricao] = useState({});
    const [msm, setMsm] = useState(null);

    useEffect(() => {
        (async () => {
            const db = getFirestore(app)
            const queryReq = query(collection(db, "list"), orderBy("descricao"));
            const result = await getDocs(queryReq)
            setList(result.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        })();
    }, [msm]);

    const handleDescricao = (event) => {
        setDescricao(event.target.value)
    }

    async function cadastra() {
        if(descricao.length > 0) {
            
            const db = getFirestore(app)
            await setDoc(doc(db, "list", uuidv4()), {
                descricao: descricao,
                check: false,
            });

            if(msm === 'Lista criada com sucesso!') {
                setMsm('Lista criada com sucesso!!')
            } else {
                setMsm('Lista criada com sucesso!')
            } 
            
        } else {
            setMsm('Insira um titulo para a lista!')
        } 
    }
    
    return(
        <div className="container-fluid mt-2">
            <div className="col">
                <div className="row">
                    {
                        msm !== null ? (
                            <div className="alert alert-warning" role="alert" style={{ width: '25rem' }}>
                                { msm }
                            </div>
                        ) : null 
                    }
                </div>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Minha lista..." onChange={ handleDescricao }/>
                    <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={ cadastra }>
                        Adicionar
                    </button>
                </div>
            </div>
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