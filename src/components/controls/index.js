import React from "react";
import propTypes from 'prop-types';
import {formatPrice} from '../price';
import plural from 'plural-ru';
import './styles.css';

function Controls({onCreate, cart}){
  console.log('Controls');

  const productsCount = cart.length && cart.reduce((sum, item) => sum += item.amount, 0);

  return (
    <div className='Controls'>
      <div>В корзине: </div>
      <b>{
        cart.length ?
          `${productsCount} ${plural(productsCount, 'товар', 'товара', 'товаров')} /
           ${formatPrice(cart.reduce((sum, item) => sum += item.price * item.amount, 0))}` :
          'пусто'
      }</b>
      <button className="Controls__go" onClick={onCreate}>Перейти</button>
    </div>
  );
}

Controls.propTypes = {
  onCreate: propTypes.func.isRequired
}

Controls.defaultProps = {
  onCreate: () => {}
}

export default React.memo(Controls);
