import React, { Component } from 'react';
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
      this.setState({ isLoading: true });
      try {
        const imagesData = await getImages(nextQuery, page);
        const { hits, totalHits } = imagesData;
        this.setState(prevState => ({
          hits: [...prevState.hits, ...hits],
          total: totalHits,
        }));
      } catch (error) {
        this.setState({ error });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  onSubmit = inputData => {
    // console.log(inputData);

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
    const { hits, isLoading, showModal, selectedImage, total } = this.state;
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
            <img src={selectedImage} alt="" />
          </Modal>
        )}
      </div>
    );
  }
}
