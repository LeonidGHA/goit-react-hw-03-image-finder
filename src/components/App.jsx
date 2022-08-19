import { Component } from 'react';
import Notiflix from 'notiflix';

import css from './App.module.css';

import { pixabayApi } from './Pixabay-api';
import Searchbar from './Searchbar/Searchbar';
import Button from './Button/Button';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import getImages from './Pixabay-api';

const newPixabayApi = new pixabayApi();
class App extends Component {
  state = {
    search: '',
    arrImage: [],
    page: 1,
    show: true,
    loading: false,
    showModal: false,
    title: '',
    total: '',
  };

  componentDidMount() {
    // console.log(hits);
    window.addEventListener('keydown', this.listenerKeyDown);
  }

  componentDidUpdate(prevProps, prevState) {
    const { search, page } = this.state;

    if (search !== prevState.search) {
      getImages(search, page)
        .then(({ hits, total }) => {
          this.setState({
            arrImage: [...hits],
            total: total,
          });
        })
        .catch(err => console.log(err));
    }

    if (page !== prevState.page) {
      getImages(search, page)
        .then(({ hits, total }) => {
          this.setState({
            arrImage: [...prevState.arrImage, ...hits],
            total: total,
          });
        })
        .catch(err => console.log(err));
    }
    // if (page !== prevState.page) {
    //   this.serachInApi(prevState);
    // }
    // if (search !== prevState.search) {
    //   this.serachInApi(prevState);
    // }
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

  // async serachInApi(prevState) {
  //   this.setState({
  //     loading: true,
  //   });
  //   console.log(prevState);
  //   try {
  //     const { search, page } = this.state;

  //     newPixabayApi.querySearch = search;
  //     newPixabayApi.page = page;

  //     const response = await newPixabayApi.takeSearchResults();
  //     const { hits, total } = response.data;

  //     if (total === 0) {
  //       this.setState({
  //         arrImage: [],
  //         show: false,
  //         loading: false,
  //       });
  //       return Notiflix.Report.failure(
  //         'Not found',
  //         'Sorry, there are no images matching your search query. Please try again.',
  //         'Retry'
  //       );
  //     }

  //     if (search !== prevState.search) {
  //       this.setState({
  //         arrImage: [...hits],

  //         show: true,
  //         loading: false,
  //       });
  //       Notiflix.Notify.info(`Hooray! We found ${total} images.`);
  //       console.log(`hi`);
  //       return;
  //     }

  //     if (page > 1) {
  //       this.setState(({ arrImage }) => ({
  //         arrImage: [...arrImage, ...hits],
  //         show: true,
  //         loading: false,
  //       }));
  //     }
  //     if (hits.length < newPixabayApi.per_page) {
  //       this.setState({
  //         show: true,
  //       });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

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
    const { arrImage, show, loading, showModal, title } = this.state;
    console.log(arrImage);
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
        {show && <Button onClickAdd={onClickAddImg} />}
      </>
    );
  }
}

export default App;
