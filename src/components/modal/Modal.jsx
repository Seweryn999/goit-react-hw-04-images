import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

export const Modal = ({ descr, source, closeModalMouse, closeModalKey }) => {
  useEffect(() => {
    document.addEventListener('keydown', closeModalKey);
    return () => {
      document.removeEventListener('keydown', closeModalKey);
    };
  }, [closeModalKey]);

  return (
    <div className={css.overlay} onClick={closeModalMouse}>
      <div className={css.modal}>
        Modal
        <img src={source} alt={descr} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  descr: PropTypes.string.isRequired,
  source: PropTypes.string.isRequired,
  closeModalMouse: PropTypes.func.isRequired,
  closeModalKey: PropTypes.func.isRequired,
};

export default Modal;
