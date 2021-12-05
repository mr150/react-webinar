import React from 'react';
import {formatPrice} from '../../utils';

function Price({children, className, type}){
  //console.log('Price', children);

  return React.createElement(type || 'span', {className}, formatPrice(children));
}

export default React.memo(Price);
