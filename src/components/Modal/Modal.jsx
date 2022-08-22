import css from './Modal.module.css';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { Component } from 'react';

const modal = document.querySelector('#modal');
// function Modal({ title, onClick }) {
//   return createPortal(
//     <div className={css.backdrop} onClick={onClick}>
//       <div className={css.modal}>
//         <img src={title} alt="" />
//       </div>
//     </div>,
//     modal
//   );
// }

// Modal.propTypes = {
//   title: PropTypes.string.isRequired,
//   onClick: PropTypes.func.isRequired,
// };
// export default Modal;

class Modal extends Component {
  state = {};

  componentDidMount() {
    window.addEventListener('keydown', this.listenerKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.listenerKeyDown);
  }

  listenerKeyDown = e => {
    if (e.code === 'Escape') {
      // this.setState({ showModal: false });
      // this.onClickToggleModal();
      this.props.onClick();
    }
  };

  onClikCloseBackDrop = ({ target, currentTarget }) => {
    if (target === currentTarget) {
      this.props.onClick();
    }
  };

  render() {
    return createPortal(
      <div
        className={css.backdrop}
        onClick={(this.listenerKeyDown, this.onClikCloseBackDrop)}
      >
        <div className={css.modal}>{this.props.children}</div>
      </div>,
      modal
    );
  }
}

export default Modal;

Modal.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};
