import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Login } from './components/Login/Login';
import { Cadastro } from './components/LoginCadastro/LoginCadastro';
import { Lista } from './components/Lista/Lista';
import { Item } from './components/Item/Item';
import { ListaEditar } from './components/ListaEditar/ListaEditar';
import { ListaCompartilhar } from './components/ListaCompartilhar/ListaCompartilhar';

const RoutesApi = () => (
    <BrowserRouter>
        { window.location.pathname === "/" ? null : <Header /> }
        <Routes>
            <Route path='*'           element={<h1>Not Found</h1>} />
            <Route path='/'           element={ <Login/> } />
            <Route path='/cadastro'   element={ <Cadastro/> } />
            <Route path='/lista'      element={ <Lista/> } />
            <Route path='/lista/:id'  element={ <Item/> } />
            <Route path='/lista/:id/editar' element={ <ListaEditar/> } />
            <Route path='/lista/:id/compartilhar' element={ <ListaCompartilhar/> } />
        </Routes>
    </BrowserRouter>
);

export default RoutesApi;