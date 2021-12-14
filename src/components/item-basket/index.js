import React from 'react';
import propTypes from 'prop-types';
import numberFormat from "../../utils/number-format";
import {Link} from 'react-router-dom';
import './styles.css';

function ItemBasket({item, onClose}) {
  return (
    <div className='ItemBasket'>
      <div className='ItemBasket__number'>{item._key}</div>
      <Link className='ItemBasket__title link' onClick={onClose} to={'/product/' + item._id}>{item.title}</Link>
      <div className='ItemBasket__right'>
        <span className="ItemBasket__cell">{numberFormat(item.price || 0)} ₽</span>
        <span className="ItemBasket__cell">{numberFormat(item.amount || 0)} шт</span>
      </div>
    </div>
  );
}

ItemBasket.propTypes = {
  item: propTypes.object.isRequired,
  onClose: propTypes.func,
}

ItemBasket.defaultProps = {
  onClose: () => {},
}

export default React.memo(ItemBasket);
