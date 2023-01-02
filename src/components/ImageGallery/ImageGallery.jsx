import React from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import './ImageGallery.css';
const ImageGallery = ({ hits, selectImg }) => {
  // console.log(hits);
  return (
    <ul className="ImageGallery">
      {hits.map(hit => (
        <ImageGalleryItem key={hit.id} hit={hit} selectImg={selectImg} />
      ))}
    </ul>
  );
};

export default ImageGallery;

ImageGallery.propTypes = {
  hits: PropTypes.arrayOf(
    PropTypes.shape({
      // Пропи User перевіряються у User.jxs
      // перевіряємо чи є id у itema (в даному випадку роль унікального значення username)
      id: PropTypes.number.isRequired,
    })
  ),
};
