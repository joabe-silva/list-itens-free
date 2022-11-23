import { React, useState } from 'react';
import { Link } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../../services/firabase-config";
import './Login.css';

export const Login = () => {

    const [email, setEmail] = useState({});
    const [senha, setSenha] = useState({});
    const [error, setError] = useState(null);

    const handleEmail = (event) => {
        setEmail(event.target.value)
    }
    const handleSenha = (event) => {
        setSenha(event.target.value)
    }

    const login = () => {
        if(email.length > 0 && senha.length > 0) {
            const auth = getAuth(app);
            signInWithEmailAndPassword(auth, email, senha)
            .then((userCredential) => {
                // Signed in 
                const { accessToken, uid } = userCredential.user;

                sessionStorage.setItem("@AuthFirebase:token", accessToken)
                sessionStorage.setItem("@AuthFirebase:userId", uid)
                window.location.replace("/my-list")
                
            })
            .catch((error) => {
                const errorCode = error.code;
                setError(errorCode)
            });
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
                            <h2 className="mb-3">Login</h2>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">E-mail</label>
                                <input type="email" className="form-control" id="email" placeholder="name@example.com" onChange={ handleEmail }  />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="senha" className="form-label">Senha</label>
                                <input type="password" className="form-control" id="senha" placeholder="xxxx" onChange={ handleSenha } />
                            </div>
                            <button className="btn btn-primary me-2" onClick={ login }>Entrar</button>
                            <Link to="/cadastro" className="btn btn-secondary">Cadastro</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
    
}