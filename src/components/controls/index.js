import React from "react";
import propTypes from 'prop-types';
import plural from 'plural-ru';
import {formatPrice} from '../../utils';
import './styles.css';

function Controls({onOpenCart, sumCount, sumPrice}){
  console.log('Controls');

  const productsCount = sumCount;

  return (
    <div className='Controls'>
      <div>В корзине: </div>
      <b>{
        sumCount ?
          `${productsCount} ${plural(productsCount, 'товар', 'товара', 'товаров')} /
           ${formatPrice(sumPrice)}` :
          'пусто'
      }</b>
      <button className="Controls__go" onClick={onOpenCart}>Перейти</button>
    </div>
  );
}

Controls.propTypes = {
  onOpenCart: propTypes.func.isRequired,
  sumCount: propTypes.number.isRequired,
  sumPrice: propTypes.number.isRequired,
};

Controls.defaultProps = {
  onOpenCart: () => {},
  sumCount: 0,
  sumPrice: 0,
};

export default React.memo(Controls);
