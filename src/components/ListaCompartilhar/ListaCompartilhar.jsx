import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getFirestore, getDoc, doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { app } from '../../services/firabase-config';

export const ListaCompartilhar = () => {

    const { id } = useParams();
    const [email, setEmail] = useState({});
    const [share, setShare] = useState([]);
    const [msm, setMsm] = useState(null);
    let count = 0;
    
    useEffect(() => {
        (async () => {
            const db = getFirestore(app)
            const result = await getDoc(
                doc(db, "list", id) 
            )
            setShare(result.data().share)
        })();
    }, [msm, id]);

    const handleEmail = (event) => {
        setEmail(event.target.value)
    }

    async function cadastra() {

        if(email.length > 0) {

            const db = getFirestore(app)
            await updateDoc(doc(db, "list", id), {
                share: arrayUnion(email)
            });

            if(msm === 'Lista compartilhada com sucesso!') {
                setMsm('Lista compartilhada com sucesso!!')
            } else {
                setMsm('Lista compartilhada com sucesso!')
            } 

        } else {
            setMsm('Insira um e-mail!')
        } 
        
    }

    async function remove(email) {
        const db = getFirestore(app)
        await updateDoc(doc(db, "list", id), {
            share: arrayRemove(email)
        });

        if(msm === 'Compartilhamento excluido!!') {
            setMsm('Compartilhamento excluido!')
        } else {
            setMsm('Compartilhamento excluido!!')
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
                <h3 className="mt-3">Compartilhar lista</h3>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="email@gmail.com" onChange={ handleEmail } />
                    <button className="btn btn-outline-primary" type="button" id="button-addon2" onClick={ cadastra }>
                        Adicionar
                    </button>
                </div>
                <ul className="list-group">
                {
                    share.filter(email => email !== sessionStorage.getItem("@AuthFirebase:userEmail"))
                         .map(email => (
                            <li className="list-group-item d-flex justify-content-between align-items-center" key={ count++ }>
                                { email }
                                <span className="badge bg-primary rounded-pill" onClick={ ()=> remove(email) }>
                                    <span className="material-symbols-outlined">
                                        delete
                                    </span>
                                </span>
                            </li>
                        )
                    )
                }
                </ul>
            </div>
        </div>
    )
    
}