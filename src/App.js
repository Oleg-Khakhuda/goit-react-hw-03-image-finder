import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './Searchbar/Searchbar';
// import { PixabayFetch } from './services/search-api';
// import axios from 'axios';
import './App.css';
import ImageGallery from './ImageGallery/ImageGallery';
// import Modal from './Modal/Modal';

// const newPixabayFetch = new PixabayFetch()

export default class App extends Component {
  state = {
    searchImageName: '',
    showModal: false,
  };

  handleSearchbarSubmit = searchImageName => {
    this.setState({ searchImageName });
  };

  onPageScroll() {
    setTimeout(
      () =>
        window.scrollTo({
          top: document.documentElement.offsetHeight,
          behavior: 'smooth',
        }),
      1000,
    );
  }

  render() {
    return (
      <>
        <Searchbar onSubmit={this.handleSearchbarSubmit} />
        <ImageGallery
          searchImageName={this.state.searchImageName}
          scroll={this.onPageScroll}
        />

        <ToastContainer autoClose={3000} />
      </>
    );
  }
}
