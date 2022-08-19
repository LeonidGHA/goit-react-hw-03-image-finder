import css from './Button.module.css';

function Button({ onClickAdd }) {
  return (
    <button className={css.btnLoadMore} type="button" onClick={onClickAdd}>
      Hello Kitty
    </button>
  );
}

export default Button;
