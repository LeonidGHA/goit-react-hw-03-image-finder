import { Component } from 'react';
import Notiflix from 'notiflix';
import PropTypes from 'prop-types';

import css from './Searchbar.module.css';

class Searchbar extends Component {
  state = {
    search: '',
  };

  searchInput = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  submitSearch = e => {
    e.preventDefault();
    // console.log(e);
    const { search } = this.state;
    if (search === '') {
      return Notiflix.Notify.failure('Enter the image name first');
    }
    this.props.onSubmit(search);
    this.reset();
  };

  reset() {
    this.setState({
      search: '',
    });
  }

  render() {
    const { search } = this.state;
    const { searchInput, submitSearch } = this;

    return (
      <header className={css.searchbar}>
        <form className={css.searchForm} onSubmit={submitSearch}>
          <button className={css.searchFormButton} type="submit">
            <span className={css.searchFormButtonLabel}>Search</span>
          </button>

          <input
            className={css.searchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={searchInput}
            value={search}
            name="search"
          />
        </form>
      </header>
    );
  }
}

Searchbar.defaultProps = {
  search: '',
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};

export default Searchbar;
