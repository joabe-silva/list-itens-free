import { React, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getFirestore, getDocs, setDoc, collection, doc, query, where } from 'firebase/firestore';
import { app } from '../../services/firabase-config';
import { uuidv4 } from '@firebase/util';

export const Lista = () => {

    const [list, setList] = useState([]);
    const [descricao, setDescricao] = useState({});
    const [msm, setMsm] = useState(null);

    useEffect(() => {
        (async () => {
            const db = getFirestore(app)
            const result = await getDocs(
                query(collection(db, "list"), where("share", "array-contains", sessionStorage.getItem("@AuthFirebase:userEmail")), where("check", "==", false))
            )
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
                criador: sessionStorage.getItem("@AuthFirebase:userEmail"),
                share: [
                    sessionStorage.getItem("@AuthFirebase:userEmail")
                ],
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
                <h3 className="mt-3">Minhas listas</h3>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Titulo da lista..." onChange={ handleDescricao }/>
                    <button className="btn btn-outline-primary" type="button" id="button-addon2" onClick={ cadastra }>
                        Adicionar
                    </button>
                </div>
            </div>
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