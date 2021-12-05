import React from "react";
import propTypes from 'prop-types';
import './style.css';

function Modal({onClose, hidden, title, children}){
  console.log('Modal');

  return (
    <div className='overlay' hidden={hidden}>
      <div className='Modal'>
        <header className='Modal__header'>
          <h2 className='Modal__title'>{title}</h2>
          <button onClick={onClose}>Закрыть</button>
        </header>
        {children}
      </div>
    </div>
  );
}

Modal.propTypes = {
  hidden: propTypes.bool,
  title: propTypes.string,
  onClose: propTypes.func.isRequired,
};

export default React.memo(Modal);
