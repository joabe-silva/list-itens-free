import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getFirestore, getDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { app } from '../../services/firabase-config';

export const ItemEditar = () => {

    const { id, id_it } = useParams();
    const [descricao, setDescricao] = useState();
    
    useEffect(() => {
        (async () => {
            const db = getFirestore(app)
            const result = await getDoc(
                doc(db, "list_item", id_it) 
            )
            setDescricao(result.data().descricao)
        })();
    }, [id_it]);

    const handleDescricao = (event) => {
        setDescricao(event.target.value)
    }

    async function remove() {
        const db = getFirestore(app)
        await deleteDoc(doc(db, "list_item", id_it))
        window.location.replace(`/lista/${id}`)
    }

    async function atualizar() {
        const db = getFirestore(app)
        await updateDoc(doc(db, "list_item", id_it), {
            descricao: descricao
        });
        window.location.replace(`/lista/${id}`)
    }
    
    return(
        <div className="container-fluid mt-2">
            <h3 className="mt-3">Edição de item</h3>
            <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder="Item..." defaultValue={ descricao } onChange={ handleDescricao } />
                <button className="btn btn-outline-primary" type="button" id="button-addon2" onClick={ atualizar } style={{ borderBottomRightRadius: '8px', borderStartEndRadius: '8px' }} >
                    Atualizar
                </button>
                <button className="btn btn-outline-primary btn-sm ms-2" type="button" onClick={ remove } style={{ borderRadius: '8px' }}>
                    <span className="material-symbols-outlined">
                        delete
                    </span>
                </button>
            </div>
        </div>
    )
    
}