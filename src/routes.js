import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from './components/Login/Login';
import { Cadastro } from './components/Cadastro/Cadastro';
import { Lista } from './components/Lista/Lista';
import { Header } from './components/Header/Header';

const RoutesApi = () => (
    <BrowserRouter>
        { window.location.pathname === "/" ? null : <Header /> }
        <Routes>
            <Route path='/' element={ <Login /> } />
            <Route path='*' element={<h1>Not Found</h1>} />
            <Route path='/cadastro' element={ <Cadastro /> } />
            <Route path='/lista' element={ <Lista /> } />
        </Routes>
    </BrowserRouter>
);

export default RoutesApi;