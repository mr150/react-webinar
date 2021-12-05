import React from 'react';
import Price from '../price';
import List from '../list';
import propTypes from 'prop-types';
import './styles.css';

function Cart({items, className}){
  console.log('Cart');

  return (
    items.length ?
      <List items={items} className={'Cart ' + className} isTable>
        <tr className='Item Cart__sum'>
          <td colSpan='2'>Итого </td>
          <Price type='td'>{items.reduce((sum, item) => sum += item.price * item.amount, 0)}</Price>
          <td>{items.reduce((sum, item) => sum += item.amount, 0)} шт</td>
        </tr>
      </List> :
    <div className='Cart__empty'>Ваша корзина пуста</div>
  );
}

Cart.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
};

Cart.defaultProps = {
  items: [],
};

export default React.memo(Cart);
