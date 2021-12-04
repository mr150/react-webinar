import React, {useCallback, useState} from "react";
import propTypes from 'prop-types';
import './styles.css';

function Item({item, onAdd}){
  console.log('Item', item.title);

  return (
    <div className='Item'>
      <div className='Item__number'>{item.code}</div>
      <div className='Item__title'>{item.title}</div>
      <div className='Item__price'>{item.price} ₽</div>
      <div className='Item__actions'>
        <button onClick={() => onAdd(item.code)}>
          Добавить
        </button>
      </div>
    </div>
  )
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  onAdd: propTypes.func.isRequired,
}

Item.defaultProps = {
  onAdd: () => {},
}

export default React.memo(Item);
