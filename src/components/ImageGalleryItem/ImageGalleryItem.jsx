import React from 'react';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ hit }) => {
  // console.log(hit);
  const { webformatURL, tags } = hit;
  return (
    <li className="gallery-item">
      <img src={webformatURL} alt={tags}></img>;
    </li>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string,
  tags: PropTypes.array,
};
