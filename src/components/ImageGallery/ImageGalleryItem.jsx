// import css from './ImageGallery.module.css';

function ImageGalleryItem({ webformat, id, largeImg, tags, renderImgInModal }) {
  return (
    <li className="gallery-item" key={id} onClick={renderImgInModal}>
      <img src={webformat} alt={tags} title={largeImg} />
    </li>
  );
}

export default ImageGalleryItem;
