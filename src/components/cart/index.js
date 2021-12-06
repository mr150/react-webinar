import React from 'react';
import Price from '../price';
import List from '../list';
import propTypes from 'prop-types';
import './styles.css';

function Cart({items, sumCount, sumPrice, className}){
  console.log('Cart');

  return (
    items.length ?
      <List items={items} className={'Cart ' + className} isTable>
        <tr className='Item Cart__sum'>
          <td colSpan='2'>Итого </td>
          <Price type='td'>{sumPrice}</Price>
          <td>{sumCount} шт</td>
        </tr>
      </List> :
    <div className='Cart__empty'>Ваша корзина пуста</div>
  );
}

Cart.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  sumCount: propTypes.number.isRequired,
  sumPrice: propTypes.number.isRequired,
};

Cart.defaultProps = {
  items: [],
  className: '',
  sumCount: 0,
  sumPrice: 0,
};

export default React.memo(Cart);
