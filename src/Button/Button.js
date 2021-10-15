import React from 'react';
import PropTypes from 'prop-types';
import s from '../Button/Button.module.css';

const Button = ({ onClick }) => {
  return (
    <div className={s.load_more}>
      <button className={s.Button} type="button" onClick={onClick}>
        Load more
      </button>
    </div>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Button;
