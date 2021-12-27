import React, {useCallback, useEffect, useState} from 'react';
import propTypes from "prop-types";
import {cn} from '@bem-react/classname'
import './styles.css';
import throttle from "lodash.throttle";

function Input(props) {

  // Внутренний стейт по умолчанию с переданным value
  const [value, change] = useState(props.value);

  // Задержка для вызова props.onChange
  const changeThrottle = useCallback(throttle(value => props.onChange(value), 1000), [props.onChange]);

  // Обработчик изменений в поле
  const onChange = useCallback(event => {
    change(event.target.value);
    changeThrottle(event.target.value);
  }, [change, changeThrottle]);

  // Обновление стейта, если передан новый value
  useEffect(() => {
    change(props.value);
  }, [props.value]);

  // CSS классы по БЭМ
  const className = cn('Input');
  let ElmName = 'input',
      inpType = props.type;

  if(props.tagName !== undefined) {
    ElmName = 'textarea';
    inpType = undefined;
  }

  return (
    <ElmName
      className={className({theme: props.theme})}
      value={value}
      type={inpType}
      name={props.name}
      placeholder={props.placeholder}
      onChange={onChange}
    />
  )
}

Input.propTypes = {
  value: propTypes.oneOfType([
    propTypes.string,
    propTypes.number,
  ]),
  type: propTypes.string,
  name: propTypes.string,
  placeholder: propTypes.string,
  onChange: propTypes.func,
  theme: propTypes.string,
}

Input.defaultProps = {
  onChange: () => {},
  type: 'text',
  theme: ''
}

export default React.memo(Input);
