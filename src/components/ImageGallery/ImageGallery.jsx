import React from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

const ImageGallery = ({ hits }) => {
  // console.log(hits);
  return (
    <ul className="gallery">
      {hits.map(hit => (
        <ImageGalleryItem key={hit.id} hit={hit} />
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
