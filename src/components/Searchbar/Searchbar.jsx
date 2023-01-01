import React, { Component } from 'react';

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
      <header className="searchbar">
        <form className="form">
          <button type="submit" className="button" onClick={this.handleSubmit}>
            <span className="button-label">Search</span>
          </button>

          <input
            className="input"
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
