import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Login } from './components/Login/Login';
import { Cadastro } from './components/Cadastro/Cadastro';
import { Lista } from './components/Lista/Lista';
import { Item } from './components/Item/Item';
import { Editar } from './components/Editar/Editar';

const RoutesApi = () => (
    <BrowserRouter>
        { window.location.pathname === "/" ? null : <Header /> }
        <Routes>
            <Route path='/' element={ <Login/> } />
            <Route path='*' element={<h1>Not Found</h1>} />
            <Route path='/cadastro' element={ <Cadastro/> } />
            <Route path='/lista' element={ <Lista/> } />
            <Route path='/lista/:id' element={ <Item/> } />
            <Route path='/editar/:id' element={ <Editar/> } />
        </Routes>
    </BrowserRouter>
);

export default RoutesApi;