import { React, useState } from "react";
import { getAuth, updatePassword, deleteUser, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, deleteDoc, collection, where, query, getDocs } from "firebase/firestore";
import { app } from "../../services/firabase-config";

export const Perfil = () => {

    const [senhaAtual, setSenhaAtual] = useState({});
    const [senhaNova, setSenhaNova] = useState({});
    const [msm, setMsm] = useState(null);

    const handleSenhaAtual = (event) => {
        setSenhaAtual(event.target.value)
    }
    const handleSenhaNova = (event) => {
        setSenhaNova(event.target.value)
    }

    async function deletaListas(id) {
        const db = getFirestore(app)
        await deleteDoc(doc(db, "list", id))
        window.location.replace("/")
    }

    async function deletaItens(id) {
        const db = getFirestore(app)
        await deleteDoc(doc(db, "list_item", id))
    }

    async function getItensLista(id) {
        const db = getFirestore(app)
        //Indentifica itens da lista
        const result = await getDocs(
            query(collection(db, "list_item"), where("id_list", "==", id))    
        );
        //Deleta itens da lista
        result.docs.map((doc) => (
            deletaItens(doc.id)
        ));
        //Deleta lista 
        deletaListas(id)
    }

    async function deletaListasItens() {
        const db = getFirestore(app)
        //Indentifica listas que o usuario criou
        const result = await getDocs(
            query(collection(db, "list"), where("criador", "==", sessionStorage.getItem("@AuthFirebase:userEmail")))    
        );
        //Deleta lista e itens da lista
        result.docs.map((doc) => ( 
            getItensLista(doc.id)
        ))
    }

    const excluirUsuario = () => {
        const auth = getAuth();
        const user = auth.currentUser;
        
        if(user){

            deleteUser(user).then(() => {
                deletaListasItens()
            }).catch((error) => {
                setMsm(error)
            });
            
        } else {
            setMsm('Não foi possivel excluir sua conta no momento. Tente novamente depois de alguns minutos.') 
        }
        
    }

    const atualizarSenha = () => {
        const auth = getAuth(app);
        const user = auth.currentUser;

        if(senhaAtual.length >= 6 && senhaNova.length >= 6) {
            if(senhaAtual === senhaNova) {
                setMsm('Senha nova não pode ser igual a senha anterior!') 
            } else {
                signInWithEmailAndPassword(auth, user.email, senhaAtual)
                .then((userCredential) => {
                    
                    console.log(userCredential.user)
                    
                    updatePassword(userCredential.user, senhaNova).then(() => {
                        setMsm('Senha alterada com sucesso!')
                    }).catch((error) => {
                        setMsm(error)
                    });
                    
                    
                })
                .catch((error) => {
                    setMsm(error.code)
                });
            }
        } else {
            setMsm('Sua senha deve conter no min. 6 caracteres!')
        }

    }

    return(
        <div className="container mt-4">
            <div className="col">
                <div className="row">
                    {
                        msm !== null ? (
                            <div className="alert alert-warning" role="alert" style={{ width: '20rem' }}>
                                { msm }
                            </div>
                        ) : null 
                    }
                </div>
                <div className="row">
                    <div className="card" style={{ width: '20rem' }}>
                        <div className="card-body">
                            <h3 className="mb-3">Meu Perfil</h3>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">E-mail</label>
                                <input type="email" className="form-control" id="email" placeholder="name@example.com" disabled defaultValue={ sessionStorage.getItem("@AuthFirebase:userEmail") } />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="senhaAtual" className="form-label">Senha atual</label>
                                <input type="password" className="form-control" id="senhaAtual" placeholder="xxxx" onChange={ handleSenhaAtual } />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="senhaNova" className="form-label">Senha nova</label>
                                <input type="password" className="form-control" id="senhaNova" placeholder="xxxx" onChange={ handleSenhaNova } />
                            </div>
                            <button className="btn btn-primary me-2 mt-2" onClick={ atualizarSenha }>Salvar</button>
                            <button className="btn btn-secondary mt-2" onClick={ excluirUsuario }>Excluir Conta</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}