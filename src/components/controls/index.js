import React from "react";
import propTypes from 'prop-types';
import plural from 'plural-ru';
import {sumPrices, sumAmount, formatPrice} from '../../utils';
import './styles.css';

function Controls({onOpenCart, cart}){
  console.log('Controls');

  const productsCount = sumAmount(cart);

  return (
    <div className='Controls'>
      <div>В корзине: </div>
      <b>{
        cart.length ?
          `${productsCount} ${plural(productsCount, 'товар', 'товара', 'товаров')} /
           ${formatPrice(sumPrices(cart))}` :
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
