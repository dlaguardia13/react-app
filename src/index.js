import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './App.css';
import { Main } from './components/main.component';
import { Login } from './components/login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CreateUser } from './components/createUser.component';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
      <Login/>
  </BrowserRouter>
);
