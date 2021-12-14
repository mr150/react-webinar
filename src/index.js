import React from 'react';
import ReactDOM from 'react-dom';
import Store from './store';
import App from './app';
import Product from './app/product';
import Main from "./app/main";
import StoreProvider from './store/provider';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import * as modules from './store/exports.js';

const root = document.getElementById('app');

// Состояние приложения
const store = new Store(modules);

// Сообщаем реакту что и куда рендерить.
ReactDOM.render(
  <BrowserRouter>
    <StoreProvider store={store}>
      <Routes>
        <Route path='/' element={<App/>}>
          <Route index element={<Main/>} />
          <Route path='product/:id' element={<Product/>} />
        </Route>
      </Routes>
    </StoreProvider>
  </BrowserRouter>,
  root
);
