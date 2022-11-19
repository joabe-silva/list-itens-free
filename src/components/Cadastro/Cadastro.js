import { Link } from "react-router-dom";
import './Cadastro.css';

export const Cadastro = () => (
    <div className="container mt-5">
        <div className="card" style={{ width: '20rem' }}>
            <div className="card-body">
                <h2 className="mb-3">Cadastro</h2>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">E-mail</label>
                    <input type="email" className="form-control" id="email" placeholder="name@example.com" />
                </div>
                <div className="mb-3">
                    <label htmlFor="senha" className="form-label">Senha</label>
                    <input type="password" className="form-control" id="senha" placeholder="min 6 caracteres" />
                </div>
                <div className="mb-3">
                    <label htmlFor="senha2" className="form-label">Conforme sua senha</label>
                    <input type="password" className="form-control" id="senha2" placeholder="min 6 caracteres" />
                </div>
                <Link to="/" className="btn btn-secondary me-2">Voltar</Link>
                <button className="btn btn-primary">Cadastrar</button>
            </div>
        </div>
    </div>
)