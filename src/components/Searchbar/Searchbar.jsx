import React, { Component } from 'react';
import './Searchbar.css';
class Searchbar extends Component {
  state = {
    searchInput: '',
  };

  handleInputChange = event => {
    const { value } = event.currentTarget;
    this.setState({ searchInput: value });
  };

  // Очистка інпутів (через очистку стейту)
  reset = () => {
    this.setState({ searchInput: '' });
    // console.log(this.state.searchInput);
  };

  handleSubmit = event => {
    event.preventDefault();

    // Записуємо у пропс значення стейту (передаємо дані у App-компонент)
    this.props.onSubmit(this.state.searchInput);
    this.reset();
  };

  render() {
    const { searchInput } = this.state;
    return (
      <header className="Searchbar">
        <form className="SearchForm">
          <button
            type="submit"
            className="SearchForm-button"
            onClick={this.handleSubmit}
          >
            <span className="SearchForm-button-label">Search</span>
          </button>

          <input
            className="SearchForm-input"
            type="text"
            value={searchInput}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleInputChange}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
