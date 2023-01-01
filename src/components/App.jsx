import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
export class App extends Component {
  state = {
    searchInput: '',
    hits: [],
    error: null,
    isLoading: false,
    page: 1,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { page } = this.state;
    const prevQuery = prevState.searchInput;
    const nextQuery = this.state.searchInput;
    // Обов'язково зробити перевірку, щоб не зациклити компонент
    if (prevQuery !== nextQuery || prevState.page !== page) {
      // console.log("Змінилось ім'я покемона:");
      // console.log('prevProps.pokemonName:', prevProps.pokemonName);
      // console.log('this.props.pokemonName', this.props.pokemonName);
      this.setState({ status: 'pending' });

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
          }))
        )
        .catch(error => this.setState({ error }));
    }
  }

  onSubmit = inputData => {
    // console.log(inputData);
    this.setState({ searchInput: inputData });
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
    console.log(this.state.page);
  };

  render() {
    const { hits } = this.state;
    return (
      <div>
        <Searchbar onSubmit={this.onSubmit} />
        {hits.length > 0 && <ImageGallery hits={hits} />}
        {hits.length > 0 && <Button loadMore={this.loadMore} />}
      </div>
    );
  }
}
