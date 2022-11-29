import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getFirestore, getDocs, setDoc, collection, doc, query, where, updateDoc, deleteDoc } from 'firebase/firestore';
import { app } from '../../services/firabase-config';
import { uuidv4 } from '@firebase/util';

export const Item = () => {

    const { id } = useParams();
    const [item, setItem] = useState([]);
    const [descricao, setDescricao] = useState({});
    const [msm, setMsm] = useState(null);

    useEffect(() => {
        (async () => {
            const db = getFirestore(app)
            const result = await getDocs(
                query(collection(db, "list_item"), where("id_list", "==", id))    
            )
            setItem(result.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        })();
    }, [id, msm]);

    const handleDescricao = (event) => {
        setDescricao(event.target.value)
    }

    async function handleCheckItem(item) {
        const db = getFirestore(app)

        if(item.check === false) {
            await updateDoc(doc(db, "list_item", item.id), {
                check: true
            });
        } else {
            await updateDoc(doc(db, "list_item", item.id), {
                check: false
            });
        }
    }

    async function arquivar(id) {
        const db = getFirestore(app)
        await updateDoc(doc(db, "list", id), {
            check: true
        });
        
    }

    async function removeItem(id) {
        const db = getFirestore(app)
        await deleteDoc(doc(db, "list_item", id))
    }

    async function remove(id) {
        const db = getFirestore(app)
        //Deleta lista
        await deleteDoc(doc(db, "list", id));

        const result = await getDocs(
            query(collection(db, "list_item"), where("id_list", "==", id))    
        )
        //Deleta itens da lista
        result.docs.map((doc) => (
           removeItem(doc.id)
        ))

    }

    async function cadastra() {
        if(descricao.length > 0) {

            const db = getFirestore(app)
            await setDoc(doc(db, "list_item", uuidv4()), {
                descricao: descricao,
                check: false,
                id_list: id,
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
                <h3 className="mt-3">Itens da lista</h3>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Descrição do item..." onChange={ handleDescricao } />
                    <button className="btn btn-outline-primary" type="button" id="button-addon2" onClick={ cadastra } style={{ borderBottomRightRadius: '8px', borderStartEndRadius: '8px' }}>
                        Adicionar
                    </button>
                    <div className="dropdown ps-2">
                        <button className="btn btn-outline-primary btn-sm" type="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ borderRadius: '8px' }}>
                            <span className="material-symbols-outlined">
                                more_vert
                            </span>
                        </button>
                        <ul className="dropdown-menu">
                            
                            <li><a className="dropdown-item" href={`/lista/${id}/editar`}>Editar</a></li>
                            <li><a className="dropdown-item" href="/lista" onClick={() => arquivar(id)}>Arquivar</a></li>
                            <li><a className="dropdown-item" href={`/lista/${id}/compartilhar`}>Compartilhar</a></li>
                            <li><hr className="dropdown-divider"/></li>
                            <li><a className="dropdown-item" href="/lista" onClick={() => remove(id)}>Excluir</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <ul className="list-group">
            {
                item.map(item => (
                    <li className="list-group-item" key={ item.id }>
                        <input className="form-check-input me-2" type="checkbox" id="firstCheckbox" defaultChecked={ item.check } onClick={()=> handleCheckItem(item) } />
                        <label className="form-check-label" htmlFor="firstCheckbox">{ item.descricao }</label>
                    </li>
                ))
            }  
            </ul> 
        </div>
    )
    
}