import css from './Button.module.css';
import PropTypes from 'prop-types';
function Button({ onClickAdd }) {
  return (
    <button className={css.btnLoadMore} type="button" onClick={onClickAdd}>
      Hello Kitty
    </button>
  );
}

Button.propTypes = {
  onClickAdd: PropTypes.func.isRequired,
};
export default Button;
