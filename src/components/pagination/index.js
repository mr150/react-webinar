import React from 'react';
import propTypes from 'prop-types';
import './styles.css';

function Pagination({count, onGo, active, itemsPerPage, className}) {
  return (
    <ul className={'Pagination ' + className}>
      {new Array(Math.ceil(count / itemsPerPage)).fill(0).map((item, i) =>
        <li key={i}>
          <a
            href={i === active ? undefined : '?page=' + i}
            className='Pagination__link'
            onClick={i === active ? undefined : (e) => {e.preventDefault(); onGo(i);}}
          >
            {i + 1}
          </a>
        </li>
      )}
    </ul>
  );
}

Pagination.propTypes = {
  count: propTypes.number.isRequired,
  active: propTypes.number,
  itemsPerPage: propTypes.number,
  onGo: propTypes.func.isRequired,
  className: propTypes.string,
};

Pagination.defaultProps = {
  active: 0,
  itemsPerPage: 10,
  className: '',
};

export default React.memo(Pagination);
