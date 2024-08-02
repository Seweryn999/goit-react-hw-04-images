import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/imageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';
import Modal from 'components/modal/Modal';

export const ImageGallery = ({ data }) => {
  const [bigUrl, setBigUrl] = useState('');
  const [description, setDescription] = useState('');

  const clearState = () => {
    setBigUrl('');
    setDescription('');
  };

  const closeModalEsc = e => {
    if (e.key === 'Escape') clearState();
  };

  const closeModalClick = () => {
    clearState();
  };

  const handleItem = callback => {
    const { bigFormatUrl, alt } = callback;
    setBigUrl(bigFormatUrl);
    setDescription(alt);
  };

  return (
    <>
      <ul className={css.gallery}>
        {data.map(({ id, webformatURL, tags, largeImageURL }) => (
          <ImageGalleryItem
            key={id}
            smallUrl={webformatURL}
            alt={tags}
            bigFormatUrl={largeImageURL}
            galleryStateFunc={handleItem}
          />
        ))}
      </ul>
      {bigUrl !== '' && (
        <Modal
          descr={description}
          source={bigUrl}
          closeModalMouse={closeModalClick}
          closeModalKey={closeModalEsc}
        />
      )}
    </>
  );
};

ImageGallery.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ImageGallery;
