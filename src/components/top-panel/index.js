import React from 'react';
import propTypes from 'prop-types';
import numberFormat from "../../utils/number-format";
import {Link} from 'react-router-dom';
import BasketSimple from '../basket-simple';
import './styles.css';

function TopPanel(props) {
  return (
    <div className='TopPanel'>
      <nav>
        <Link className='TopPanel__link' to='/'>Главная</Link>
      </nav>
      <BasketSimple className='TopPanel__basket' {...props}/>
    </div>
  );
}

export default React.memo(TopPanel);
