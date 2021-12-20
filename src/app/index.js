import React from 'react';
import Main from "./main";
import Basket from "./basket";
import useSelector from "../utils/use-selector";
import ProductPage from './product-page';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import '../styles.css';

/**
 * Приложение
 */
function App() {

  const select = useSelector(state => ({
    name: state.modals.name
  }));

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main/>} />
        <Route path='product/:id' element={<ProductPage/>} />
      </Routes>
      {select.name === 'basket' && <Basket/>}
    </BrowserRouter>
  );
}

export default React.memo(App);
