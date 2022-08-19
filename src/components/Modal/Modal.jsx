import css from './Modal.module.css';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const modal = document.querySelector('#modal');
function Modal({ title, onClick }) {
  return createPortal(
    <div className={css.backdrop} onClick={onClick}>
      <div className={css.modal}>
        <img src={title} alt="" />
      </div>
    </div>,
    modal
  );
}

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
export default Modal;
