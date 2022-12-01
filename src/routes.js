import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Login } from './components/Login/Login';
import { Cadastro } from './components/LoginCadastro/LoginCadastro';
import { Lista } from './components/Lista/Lista';
import { Item } from './components/Item/Item';
import { ListaEditar } from './components/ListaEditar/ListaEditar';
import { ListaCompartilhar } from './components/ListaCompartilhar/ListaCompartilhar';
import { ListaArquivada } from './components/ListaArquivada/ListaArquivada';
import { ItemEditar } from './components/ItemEditar/ItemEditar';
import { Perfil } from './components/Perfil/Perfil';

/*
function isAuthenticated() {
    if(sessionStorage.getItem("@AuthFirebase:token")) {
        return true;
    }
    return false;
}

const CheckRoute = ({ admin, children }) => {


    // seu código para autenticação e checar se o usuário pode usar essa rota
    const user = { admin: false }

    return (!admin || (admin && user.admin)) ? children : <Redirect to="/login"/>

}
*/

const RoutesApi = () => (
    <BrowserRouter>
        { window.location.pathname === "/" ? null : <Header /> }
        <Routes>
            <Route path='*'                             element={<h1>Not Found</h1>} />
            <Route path='/'                             element={ <Login/> } />
            <Route path='/cadastro'                     element={ <Cadastro/> } />
            <Route path='/lista'                        element={ <Lista/> } />
            <Route path='/lista/:id'                    element={ <Item/> } />
            <Route path='/lista/:id/editar'             element={ <ListaEditar/> } />
            <Route path='/lista/:id/compartilhar'       element={ <ListaCompartilhar/> } />
            <Route path='/lista/arquivada'              element={ <ListaArquivada/> } />
            <Route path='/lista/:id/item/:id_it/editar' element={ <ItemEditar/> } />
            <Route path='/perfil'                       element={ <Perfil/> } />
        </Routes>
    </BrowserRouter>
);

export default RoutesApi;