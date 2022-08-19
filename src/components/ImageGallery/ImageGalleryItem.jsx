import PropTypes from 'prop-types';

function ImageGalleryItem({ webformat, id, largeImg, tags, renderImgInModal }) {
  return (
    <li className="gallery-item" key={id} onClick={renderImgInModal}>
      <img src={webformat} alt={tags} title={largeImg} />
    </li>
  );
}
ImageGalleryItem.propTypes = {
  webformat: PropTypes.string.isRequired,
  id: PropTypes.number,
  largeImg: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  renderImgInModal: PropTypes.func.isRequired,
};
export default ImageGalleryItem;
