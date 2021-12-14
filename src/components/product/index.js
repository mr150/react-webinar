import React from 'react';
import propTypes from 'prop-types';
import numberFormat from "../../utils/number-format";
import './styles.css';

function Product({onAdd, data}) {
  return (
    <div className='Product'>
      <p>{data.description}</p>
      <p>Страна производитель: <b>{data.maidIn?.title} ({data.maidIn?.code})</b></p>
      <p>Категория: <b>{data.category?.title}</b></p>
      <p>Год выпуска: <b>{data.edition}</b></p>
      <strong className='Product__price'>{numberFormat(data.price)} ₽</strong>
      <button onClick={() => onAdd(data._id)}>Добавить</button>
    </div>
  );
}

Product.propTypes = {
  data: propTypes.object.isRequired,
  onAdd: propTypes.func,
}

Product.defaultProps = {
  onAdd: () => {},
}

export default React.memo(Product);
