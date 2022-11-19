import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from './components/Login/Login';

const RoutesApi = () => (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={ <Login /> } />
            <Route path='*' element={<h1>Not Found</h1>} />
            <Route path='my-lists/' element={<h1>my-lists</h1>} />
        </Routes>
    </BrowserRouter>
);

export default RoutesApi;