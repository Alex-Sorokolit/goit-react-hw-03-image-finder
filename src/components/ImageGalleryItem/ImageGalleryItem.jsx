import React from 'react';
import PropTypes from 'prop-types';
import './ImageGalleryItem.css';
const ImageGalleryItem = ({ hit, selectImg }) => {
  // console.log(hit);
  const { webformatURL, tags, largeImageURL } = hit;
  return (
    <li className="ImageGalleryItem">
      <img
        className="ImageGalleryItem-image"
        src={webformatURL}
        alt={tags}
        onClick={() => selectImg(largeImageURL)}
      ></img>
    </li>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string,
  tags: PropTypes.array,
};
