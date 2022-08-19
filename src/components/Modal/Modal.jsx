import css from './Modal.module.css';
import { createPortal } from 'react-dom';

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

export default Modal;
