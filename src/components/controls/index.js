import React from "react";
import propTypes from 'prop-types';
import {formatPrice} from '../price';
import plural from 'plural-ru';
import './styles.css';

function Controls({onOpenCart, cart}){
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
      <button className="Controls__go" onClick={onOpenCart}>Перейти</button>
    </div>
  );
}

Controls.propTypes = {
  onOpenCart: propTypes.func.isRequired,
  cart: propTypes.arrayOf(propTypes.object).isRequired,
}

Controls.defaultProps = {
  onOpenCart: () => {},
  cart: [],
}

export default React.memo(Controls);
