import React from 'react';
import { Component } from 'react';
import { toast } from 'react-toastify';
import s from '../Searchbar/Searchbar.module.css';

export default class Searchbar extends Component {
  state = {
    searchImageName: '',
  };

  handleNameChange = e => {
    this.setState({ searchImageName: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.searchImageName.trim() === '') {
      toast.error('Введите название картинки!');
      return;
    }
    this.props.onSubmit(this.state.searchImageName);
    this.setState({ searchImageName: '' });
  };

  render() {
    return (
      <header className={s.Searchbar}>
        <form className={s.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={s.SearchForm__button}>
            <span className={s.SearchForm__button__label}>Search</span>
          </button>

          <input
            className={s.SearchForm__input}
            value={this.state.searchImageName}
            type="text"
            placeholder="Search images and photos"
            onChange={this.handleNameChange}
          />
        </form>
      </header>
    );
  }
}
