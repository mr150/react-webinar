import React from 'react';
import propTypes from 'prop-types';
import Item from '../item';
import './styles.css';

function List({items, onAddToCart, isTable, className, children}){
  console.log('List');
  const Type = isTable ? 'table' : 'div';

  return (
    <Type className={'List ' + className}>{items.map(
      item => <Item className='List__item' isTable={isTable} key={item.code} item={item} onAdd={onAddToCart}/>
    )}
      {children}
    </Type>
  );
}

List.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  onAddToCart: propTypes.func.isRequired,
  isTable: propTypes.bool,
};

List.defaultProps = {
  items: [],
  className: '',
  onAddToCart: () => {},
};

export default React.memo(List);
