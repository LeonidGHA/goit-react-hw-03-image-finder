import css from './ImageGallery.module.css';
import ImageGalleryItem from './ImageGalleryItem';

function ImageGallery({ arrImage, renderImgInModal }) {
  const renderItem = arrImage.map(
    ({ id, webformatURL, largeImageURL, tags }) => (
      <ImageGalleryItem
        webformat={webformatURL}
        key={id.toString()}
        largeImg={largeImageURL}
        tags={tags}
        renderImgInModal={renderImgInModal}
      />
    )
  );

  return <ul className={css.ImageGallery}>{renderItem}</ul>;
}

export default ImageGallery;
