import React from 'react';
import Main from "./main";
import Basket from "./basket";
import useSelector from "../utils/use-selector";
import {Outlet} from 'react-router-dom';
import '../styles.css';

/**
 * Приложение
 */
function App() {

  const select = useSelector(state => ({
    name: state.modals.name
  }));

  return (
    <>
      <Outlet/>
      {select.name === 'basket' && <Basket/>}
    </>
  );
}

export default React.memo(App);
