// import PropTypes from 'prop-types';
import React, { useState, useEffect, useCallback } from 'react';
import Searchbar from './searchbar/Searchbar';
import Button from './button/Button';
import ImageGallery from './imageGallery/ImageGallery';
import { apiUrl } from './js/api-url';
import { pixabayApiLuncher } from './js/pixabay-api-luncher';
import { ThreeDots } from 'react-loader-spinner';
import { scrollAfterLoad } from './js/scroll-after-load';

export const App = () => {
  const [querry, setQuerry] = useState('');
  const [page, setPage] = useState(1);
  const perPage = 12;
  const [isLoading, setIsLoading] = useState(false);
  const [pictures, setPictures] = useState([]);
  const [error, setError] = useState(null);

  const apiUrlState = useCallback(async () => {
    setIsLoading(true);
    if (page === 1) {
      try {
        const answer = await pixabayApiLuncher(apiUrl(querry, page, perPage));
        setPictures(answer.data.hits);
      } catch (er) {
        setError(er);
      } finally {
        setIsLoading(false);
      }
    } else {
      try {
        const answer = await pixabayApiLuncher(apiUrl(querry, page, perPage));
        setPictures(prevState => {
          return [...prevState, ...answer.data.hits];
        });
      } catch (er) {
        setError(er);
      } finally {
        setIsLoading(false);
        if (page > 1) {
          scrollAfterLoad(520);
        }
      }
    }
  }, [querry, page]);

  const submitHandlerSearch = value => {
    setQuerry(value);
    setPage(1);
  };

  const pageHandlerBtn = () => {
    setPage(prevState => prevState + 1);
  };

  useEffect(() => {
    // if (firstRun === true && querry==='' ) {
    //   setFirstRun(false);
    // } else {
    if (querry !== '' || page !== 1) apiUrlState();
  }, [querry, page, apiUrlState]);

  return (
    <>
      <Searchbar onSubmit={submitHandlerSearch} />
      {isLoading && (
        <ThreeDots
          height="80"
          width="80"
          radius="9"
          color="#2a6ccf"
          ariaLabel="three-dots-loading"
          wrapperStyle={{ position: 'absolute', left: '50%', top: '50%' }}
          wrapperClassName=""
          visible={true}
        />
      )}
      {error !== null && <p>Wystąpił błąd: {error}</p>}
      {pictures.length > 0 && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <ImageGallery data={pictures} />
          <Button pagehandler={pageHandlerBtn} />
        </div>
      )}
    </>
  );
};
