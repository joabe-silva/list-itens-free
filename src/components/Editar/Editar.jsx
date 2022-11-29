import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getFirestore, getDoc, doc, updateDoc } from 'firebase/firestore';
import { app } from '../../services/firabase-config';

export const Editar = () => {

    const { id } = useParams();
    const [descricao, setDescricao] = useState();
    
    useEffect(() => {
        (async () => {
            const db = getFirestore(app)
            const result = await getDoc(
                doc(db, "list", id) 
            )
            setDescricao(result.data().descricao)
        })();
    });

    const handleDescricao = (event) => {
        setDescricao(event.target.value)
    }

    async function atualizar() {
        const db = getFirestore(app)
        await updateDoc(doc(db, "list", id), {
            descricao: descricao
        });
        window.location.replace("/lista")
    }
    
    return(
        <div className="container-fluid mt-2">
            <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder="Lista..." defaultValue={ descricao } onChange={ handleDescricao } />
                <button className="btn btn-outline-primary" type="button" id="button-addon2" onClick={ atualizar }>
                    Atualizar
                </button>
            </div>
        </div>
    )
    
}