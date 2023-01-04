import React, { Component } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import './App.css';
import Modal from './Modal/Modal';
import Loader from './Loader/Loader';
import getImages from '../services/Api';

export class App extends Component {
  state = {
    searchInput: '',
    hits: [],
    error: null,
    isLoading: false,
    page: 1,
    showModal: false,
    selectedImage: '',
    total: 0,
  };

  async componentDidUpdate(_, prevState) {
    const prevQuery = prevState.searchInput;
    const nextQuery = this.state.searchInput;
    const { page } = this.state;

    // Обов'язково зробити перевірку, щоб не зациклити компонент
    if (prevQuery !== nextQuery || prevState.page !== page) {
      this.setState({ isLoading: true, error: null });
      try {
        // Запит на бекенд
        const imagesData = await getImages(nextQuery, page);
        const { hits, totalHits } = imagesData;

        // Перевірка чи є результати пошуку
        if (hits.length === 0) {
          toast.error('За вашим запитом немає результатів');
          return;
        }

        // Забираємо тільки ті дані які потрібні
        const filteredData = imagesData.hits.map(
          ({ id, tags, webformatURL, largeImageURL }) => ({
            id,
            tags,
            webformatURL,
            largeImageURL,
          })
        );

        // Записуємо дані у стейт
        this.setState(prevState => ({
          hits: [...prevState.hits, ...filteredData],
          total: totalHits,
        }));

        // Показуємо кількість результатів при першому запиті
        if (page === 1) {
          toast.success(`Знайдено ${totalHits} результатів`);
        }
      } catch (error) {
        this.setState({ error: 'Щось пішло не так, перезавантажте сторінку' });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  onSubmit = inputData => {
    // console.log(inputData);
    if (this.state.searchInput === inputData) {
      toast.error(`Проявляйте креатив, пришіть різні запити`);
      return;
    }
    this.setState({
      searchInput: inputData,
      hits: [],
      page: 1,
    });
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
    // console.log(this.state.page);
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  setActiveImage = urlBigImage => {
    this.setState({ selectedImage: urlBigImage });
    this.toggleModal();
  };

  render() {
    const { hits, isLoading, showModal, selectedImage, total, error } =
      this.state;
    return (
      <div className="App">
        <Searchbar onSubmit={this.onSubmit} />

        {hits.length > 0 && (
          <ImageGallery hits={hits} selectImg={this.setActiveImage} />
        )}
        {isLoading && <Loader />}

        {!isLoading && hits.length > 0 && total > hits.length && (
          <Button loadMore={this.loadMore} />
        )}
        {showModal && (
          <Modal onClose={this.toggleModal}>
            {selectedImage && <img src={selectedImage} alt="" />}
            {/* <img src={selectedImage} alt="" /> */}
          </Modal>
        )}
        <Toaster
          position="top-right"
          toastOptions={{
            success: {
              style: {
                background: 'rgba(255, 255, 255, 0.8)',
              },
            },
            error: {
              style: {
                color: 'black',
                background: 'rgba(255, 255, 255, 0.8)',
              },
            },
          }}
        />
        {error && <h2>{error}</h2>}
      </div>
    );
  }
}
