import React, {useCallback, useEffect, useState} from 'react';
import propTypes from "prop-types";
import {cn} from '@bem-react/classname';
import './styles.css';

function Field({label, message, children}) {

  const clnm = cn('Field');

  return (
    <div className={clnm()}>
      <label>
        <span className={clnm('Label')}>{label}</span>
        {children}
      </label>
      {message && <div className={clnm('Message')}>{message}</div>}
    </div>
  );
}

Field.propTypes = {
  label: propTypes.string,
  message: propTypes.string,
};

Field.defaultProps = {
  label: '',
  message: '',
};

export default React.memo(Field);
