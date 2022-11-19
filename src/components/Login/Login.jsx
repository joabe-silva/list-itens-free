import { Link } from "react-router-dom";
import './Login.css';

export const Login = () => (
    <div className="container mt-5">
        <div className="card" style={{ width: '20rem' }}>
            <div className="card-body">
                <h2 className="mb-3">Login</h2>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">E-mail</label>
                    <input type="email" className="form-control" id="email" placeholder="name@example.com" />
                </div>
                <div className="mb-3">
                    <label htmlFor="senha" className="form-label">Senha</label>
                    <input type="password" className="form-control" id="senha" placeholder="xxxx" />
                </div>
                <button className="btn btn-primary me-2">Entrar</button>
                <Link to="/cadastro" className="btn btn-secondary">Cadastro</Link>
            </div>
        </div>
    </div>
)