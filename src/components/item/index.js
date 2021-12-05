import React from "react";
import propTypes from 'prop-types';
import Price from '../price';
import './styles.css';

function Item({item, onAdd, isTable, className}){
  console.log('Item', item.title);
  let ItemTag = 'div',
      PartTag = 'div';

  if(isTable) {
    ItemTag = 'tr';
    PartTag = 'td';
  }

  return (
    <ItemTag className={'Item ' + className}>
      <PartTag>{item.code}</PartTag>
      <PartTag className='Item__title'>{item.title}</PartTag>
      <Price type={PartTag} className='Item__price'>{item.price}</Price>
      {
        item.amount === undefined ?
          <PartTag><button onClick={() => onAdd(item)}>Добавить</button></PartTag> :
        <PartTag>{item.amount} шт</PartTag>
      }
    </ItemTag>
  );

}

Item.propTypes = {
  item: propTypes.object.isRequired,
  onAdd: propTypes.func.isRequired,
  isTable: propTypes.bool,
};

Item.defaultProps = {
  onAdd: () => {},
  className: '',
};

export default React.memo(Item);
