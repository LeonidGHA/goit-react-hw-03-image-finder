import { Component } from 'react';
import Notiflix from 'notiflix';

import css from './App.module.css';

import { pixabayApi } from './Pixabay-api';
import Searchbar from './Searchbar/Searchbar';
import Button from './Button/Button';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';

const newPixabayApi = new pixabayApi();
class App extends Component {
  state = {
    search: '',
    arrImage: [],
    page: 1,
    hidden: true,
    loading: false,
    showModal: false,
    title: '',
  };

  componentDidMount() {
    // console.log(hits);
    this.serachInApi();

    window.addEventListener('keydown', this.listenerKeyDown);
  }

  componentDidUpdate(prevProps, prevState) {
    const { search, page } = this.state;

    if (page !== prevState.page || search !== prevState.search) {
      this.serachInApi();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.listenerKeyDown);
  }

  listenerKeyDown = e => {
    if (e.code === 'Escape') {
      this.setState({ showModal: false });
      // this.onClickToggleModal();
    }
  };

  async serachInApi() {
    this.setState({
      loading: true,
    });
    try {
      const { search, page } = this.state;

      newPixabayApi.querySearch = search;
      newPixabayApi.page = page;
      const response = await newPixabayApi.takeSearchResults();
      const { hits, total, totalHits } = response.data;
      if (search === '' && page === 1) {
        this.setState({
          arrImage: [...hits],
          loading: false,
        });
      }
      if (search !== '' && page === 1) {
        this.setState({
          arrImage: [...hits],
          hidden: true,
          loading: false,
        });
        Notiflix.Notify.info(`Hooray! We found ${totalHits} images.`);
      }
      if (page > 1) {
        this.setState(({ arrImage }) => ({
          arrImage: [...arrImage, ...hits],
          hidden: true,
          loading: false,
        }));
      }
      if (hits.length < newPixabayApi.per_page) {
        this.setState({
          hidden: false,
        });
      }
      if (total === 0) {
        Notiflix.Report.failure(
          'Not found',
          'Sorry, there are no images matching your search query. Please try again.',
          'Retry'
        );
        this.setState({
          arrImage: [],
          hidden: false,
          loading: false,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  onSubmitData = dataSearch => {
    this.setState({
      search: dataSearch,
    });
  };

  onClickAddImg = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  onClickToggleModal = () => {
    this.setState(prevState => ({
      showModal: !prevState.showModal,
    }));
  };

  renderImgInModal = ({ target }) => {
    this.onClickToggleModal();

    const { title } = target;
    this.setState({
      title,
    });
  };

  onClikCloseBackDrop = ({ target, currentTarget }) => {
    if (target === currentTarget) {
      this.onClickToggleModal();
    }
  };

  render() {
    const {
      onSubmitData,
      onClickAddImg,
      renderImgInModal,
      onClikCloseBackDrop,
    } = this;
    const { arrImage, hidden, loading, showModal, title } = this.state;

    return (
      <>
        <div className={css.App}>
          {showModal && <Modal title={title} onClick={onClikCloseBackDrop} />}
          <Searchbar onSubmit={onSubmitData} />
          <ImageGallery
            arrImage={arrImage}
            renderImgInModal={renderImgInModal}
          />
          {loading && <Loader />}
        </div>
        {hidden && <Button onClickAdd={onClickAddImg} />}
      </>
    );
  }
}

export default App;
