import { Component } from 'react';
import Notiflix from 'notiflix';

import css from './App.module.css';

import Searchbar from './Searchbar/Searchbar';
import Button from './Button/Button';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import getImages from './Pixabay-api';

class App extends Component {
  state = {
    search: '',
    arrImage: [],
    page: 1,
    showBtn: false,
    loading: false,
    showModal: false,
    total: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const { search, page } = this.state;

    if (search !== prevState.search) {
      this.setState({
        loading: true,
      });
      getImages(search, page)
        .then(({ hits, total }) => {
          if (total === 0) {
            this.setState({
              loading: false,
              showBtn: false,
              arrImage: [],
            });
            return Notiflix.Report.failure(
              'Not found',
              'Sorry, there are no images matching your search query. Please try again.',
              'Retry'
            );
          }
          Notiflix.Notify.info(`Hooray! We found ${total} images.`);
          this.setState({
            arrImage: [...hits],
            total: total,
            showBtn: true,
            loading: false,
          });
        })
        .catch(err => console.log(err));
    }

    if (page !== prevState.page && page !== 1) {
      this.setState({
        loading: true,
      });
      getImages(search, page)
        .then(({ hits, total }) => {
          if (hits.length < 12) {
            this.setState({
              showBtn: false,
            });
          }
          this.setState({
            arrImage: [...prevState.arrImage, ...hits],
            total: total,
            loading: false,
          });
        })
        .catch(err => console.log(err));
    }
  }

  onSubmitData = dataSearch => {
    this.setState({
      search: dataSearch,
      page: 1,
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

  render() {
    const { onSubmitData, onClickAddImg, renderImgInModal } = this;
    const { arrImage, showBtn, loading, showModal, title } = this.state;
    // console.log(arrImage);
    return (
      <>
        <div className={css.App}>
          {showModal && (
            <Modal onClick={this.onClickToggleModal}>
              <img src={title} alt="" />
            </Modal>
          )}
          <Searchbar onSubmit={onSubmitData} />
          <ImageGallery
            arrImage={arrImage}
            renderImgInModal={renderImgInModal}
          />
          {loading && <Loader />}
        </div>
        {showBtn && <Button onClickAdd={onClickAddImg} />}
      </>
    );
  }
}

export default App;
