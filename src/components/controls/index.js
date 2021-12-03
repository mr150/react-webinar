import React from "react";
import propTypes from 'prop-types';
import './styles.css';

function Controls({onCreate}){
  console.log('Controls');

  return (
    <div className='Controls'>
      <div>В корзине: 3 товара / 243 ₽</div>
      <button onClick={onCreate}> Перейти</button>
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
