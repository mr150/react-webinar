import React from 'react';

function Price({children, className, type}){
  //console.log('Price', children);

  return React.createElement(type || 'span', {className}, formatPrice(children));
}

export function formatPrice(value) {
  let result = '',
      strValue = value.toString();

  for(let i = 1; i <= strValue.length; i++) {
    result = strValue[strValue.length - i] + result;
    if(!(i % 3)) result = ' ' + result;
  }

  return result += ' ₽';
}

export default React.memo(Price);
