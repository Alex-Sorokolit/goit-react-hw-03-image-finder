import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import { Blocks } from 'react-loader-spinner';
import './App.css';
import Modal from './Modal/Modal';

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

  async componentDidUpdate(prevProps, prevState) {
    const { page } = this.state;
    const prevQuery = prevState.searchInput;
    const nextQuery = this.state.searchInput;
    // Обов'язково зробити перевірку, щоб не зациклити компонент
    if (prevQuery !== nextQuery || prevState.page !== page) {
      this.setState({ isLoading: true });

      await fetch(
        `https://pixabay.com/api/?q=${nextQuery}&page=${page}&key=30638456-f2e7f2d4200256b3df9ced703&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject(
            new Error(`Пошук за запитом ${nextQuery} не дав результатів`)
          );
        })
        .then(imagesData =>
          this.setState(prevState => ({
            hits: [...prevState.hits, ...imagesData.hits],
            isLoading: false,
            total: imagesData.total,
          }))
        )
        .catch(error => this.setState({ error }));
    }
  }

  onSubmit = inputData => {
    // console.log(inputData);

    this.setState({
      searchInput: inputData,
      hits: [],
    });
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
    console.log(this.state.page);
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  setActiveImage = urlBigImage => {
    this.setState({ selectedImage: urlBigImage });
    this.toggleModal();
  };

  render() {
    const { hits, isLoading, showModal, selectedImage } = this.state;
    return (
      <div className="App">
        <Searchbar onSubmit={this.onSubmit} />
        {isLoading && (
          <Blocks
            visible={true}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
          />
        )}
        {hits.length > 0 && (
          <ImageGallery hits={hits} selectImg={this.setActiveImage} />
        )}
        {hits.length > 0 && <Button loadMore={this.loadMore} />}
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={selectedImage} alt="" />
          </Modal>
        )}
      </div>
    );
  }
}
