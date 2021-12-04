import React from "react";
import propTypes from 'prop-types';
import plural from 'plural-ru';
import './styles.css';

function Controls({onCreate, cart}){
  console.log('Controls');

  return (
    <div className='Controls'>
      <div>В корзине: </div>
      <b>{
        cart.length ?
          `${cart.length} ${plural(cart.length, 'товар', 'товара', 'товаров')} / ${cart.reduce((sum, item) => sum += item.price, 0)} ₽` :
          ' пусто'
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
