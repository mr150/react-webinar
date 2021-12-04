import React from 'react';
import propTypes from 'prop-types';
import Item from '../item';
import './styles.css';

function List({items, onAddToCart}){
  console.log('List');
  return (
    <div className='List'>{items.map(item =>
      <div className='List__item' key={item.code}>
        <Item item={item} onAdd={onAddToCart}/>
      </div>
    )}
    </div>
  )
}

List.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  onAddToCart: propTypes.func,
}

List.defaultProps = {
  items: [],
  onAddToCart: () => {},
}

export default React.memo(List);
