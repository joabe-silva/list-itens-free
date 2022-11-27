import { React, useState } from 'react';
import { Link } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "../../services/firabase-config";
import './Cadastro.css';

export const Cadastro = () => {

    const [email, setEmail] = useState({});
    const [senha, setSenha] = useState({});
    const [contraSenha, setContraSenha] = useState({});
    const [error, setError] = useState(null);

    const handleEmail = (event) => {
        setEmail(event.target.value)
    }
    const handleSenha = (event) => {
        setSenha(event.target.value)
    }
    const handleContraSenha = (event) => {
        if(senha !== event.target.value) {
            setError('As senhas não batem!')
        } else {
            setError(null)
        }
        setContraSenha(event.target.value)
    }

    const cadastra = () => {
        
        if(
           email.length > 0 && 
           senha.length > 0 && 
           contraSenha.length > 0 && 
           error === null
        ){
            if(senha.length >= 6) {
                const auth = getAuth(app);
                createUserWithEmailAndPassword(auth, email, senha)
                .then((userCredential) => {
                    // Signed in 
                    const { accessToken, uid, email } = userCredential.user;

                    sessionStorage.setItem("@AuthFirebase:token", accessToken)
                    sessionStorage.setItem("@AuthFirebase:userId", uid)
                    sessionStorage.setItem("@AuthFirebase:userEmail", email)
                    window.location.replace("/lista")

                })
                .catch((error) => {
                    const errorCode = error.code;
                    setError(errorCode)
                });
            } else {
                setError('Sua senha deve conter no min. 6 caracteres!')
            }
        } else {
            setError('Preencha todos os campos!')
        }
        
    }

    return(
        <div className="container mt-5">       
            <div className="col">
                <div className="row">
                    {
                        error !== null ? (
                            <div className="alert alert-warning" role="alert" style={{ width: '25rem' }}>
                                { error }
                            </div>
                        ) : null 
                    }
                </div>
                <div className="row">
                    <div className="card" style={{ width: '20rem' }}>
                        <div className="card-body">
                            <h2 className="mb-3">Cadastro</h2>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">E-mail</label>
                                <input type="email" className="form-control" id="email" placeholder="name@example.com" required onChange={ handleEmail } />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="senha" className="form-label">Senha</label>
                                <input 
                                    type="password" 
                                    className="form-control" 
                                    id="senha" 
                                    placeholder="min. 6 caracteres" 
                                    minLength="6"
                                    required 
                                    onChange={ handleSenha } 
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="senha2" className="form-label">Conforme sua senha</label>
                                <input 
                                    type="password" 
                                    className="form-control" 
                                    id="senha2" 
                                    placeholder="min. 6 caracteres" 
                                    minLength="6"
                                    required 
                                    onChange={ handleContraSenha } 
                                />
                            </div>
                            <Link to="/" className="btn btn-secondary me-2">Voltar</Link>
                            <button className="btn btn-primary" onClick={ cadastra }>Cadastrar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
    
}