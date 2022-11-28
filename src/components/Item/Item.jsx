import { React, useState, useEffect } from 'react';
import { app } from "../../services/firabase-config";
import { useParams } from 'react-router-dom';
import { getFirestore, getDoc, doc, updateDoc, arrayUnion /*, collection, getDocs, setDoc, docs, query, where*/ } from "firebase/firestore";


export const Item = () => {

    const { id } = useParams();
    const [item, setItem] = useState([]);
    const [descricao, setDescricao] = useState({});
    const [msm, setMsm] = useState(null);
    var count = 0;

    useEffect(() => {
        (async () => {
            const db = getFirestore(app)
            const queryReq = doc(db, "list", id);
            const result = await getDoc(queryReq)

            setItem(result.data().item)
        })();
    }, [id, msm]);

    const handleDescricao = (event) => {
        setDescricao(event.target.value)
    }

    async function handleCheckItem(p) {
        console.log(p)

        const db = getFirestore(app)
        const queryReq = doc(db, "list", id);

        await updateDoc(queryReq, {
            `item[${p}]check`: true, 
        });
    }

    async function cadastra() {
        if(descricao.length > 0) {

            const db = getFirestore(app)
            const queryReq = doc(db, "list", id);
            
            const newItem = {
                descricao: descricao,
                check: false
            }

            await updateDoc(queryReq, {
                item: arrayUnion(newItem)
            });
            
            if(msm === 'Item criado com sucesso!') {
                setMsm('Item criado com sucesso!!')
            } else {
                setMsm('Item criado com sucesso!')
            } 
            
        } else {
            setMsm('Insira um nome para o item!')
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
                    <input type="text" className="form-control" placeholder="Item..." onChange={ handleDescricao }/>
                    <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={ cadastra }>
                        Adicionar
                    </button>
                    <div className="dropdown ps-2">
                        <button className="btn btn-outline-secondary" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <span className="material-symbols-outlined">
                                more_vert
                            </span>
                        </button>
                        <ul className="dropdown-menu">
                            <li><a className="dropdown-item" href="/#">Compartilhar</a></li>
                            <li><a className="dropdown-item" href="/#">Arquivar lista</a></li>
                            <li><a className="dropdown-item" href="/#">Excluir lista</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <ul className="list-group">
            {
                item.map(i => (
                    <li className="list-group-item" key={ count++ }>
                        <input className="form-check-input me-2" type="checkbox" id="firstCheckbox" defaultChecked={ i.check } onClick={()=> handleCheckItem(count-1) } />
                        <label className="form-check-label" htmlFor="firstCheckbox">{ i.descricao }</label>
                    </li>
                ))
            }  
            </ul> 
        </div>
    )
    
}