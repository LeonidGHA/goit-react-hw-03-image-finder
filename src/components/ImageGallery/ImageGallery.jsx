import css from './ImageGallery.module.css';
import ImageGalleryItem from './ImageGalleryItem';
import PropTypes from 'prop-types';

function ImageGallery({ arrImage, renderImgInModal }) {
  const renderItem = arrImage.map(
    ({ id, webformatURL, largeImageURL, tags }) => (
      <ImageGalleryItem
        webformat={webformatURL}
        key={id}
        largeImg={largeImageURL}
        tags={tags}
        renderImgInModal={renderImgInModal}
      />
    )
  );

  return <ul className={css.ImageGallery}>{renderItem}</ul>;
}

ImageGallery.propTypes = {
  arrImage: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
  renderImgInModal: PropTypes.func.isRequired,
};
export default ImageGallery;
