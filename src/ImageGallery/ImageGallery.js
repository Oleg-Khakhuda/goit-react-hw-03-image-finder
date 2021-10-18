import React from 'react';
import { Component } from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import { PixabayFetch } from '../services/search-api';
import Button from '../Button/Button';
import Loader from '../Loader/Loader';
import Modal from '../Modal/Modal';
import s from '../ImageGallery/ImageGallery.module.css';

const newPixabayFetch = new PixabayFetch();

export default class ImageGallery extends Component {
  state = {
    searchResult: [],
    status: 'idle',
    bigImg: null,
    showModal: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchImageName !== this.props.searchImageName) {
      this.setState({ status: 'pending' });
      newPixabayFetch.resetPage();
      newPixabayFetch.searchQuery = this.props.searchImageName;
      newPixabayFetch
        .searchImages()
        .then(searchResult => {
          // console.log(searchResult)
          this.setState({ searchResult, status: 'success' });
        })
        .catch(err => {
          console.log(err);
          this.setState({ status: 'error' });
        });
    }
  }

  handleClick = () => {
    newPixabayFetch.page = 1;
    newPixabayFetch
      .searchImages()
      .then(searchResult => {
        this.setState(prev => ({
          searchResult: [...prev.searchResult, ...searchResult],
          status: 'success',
        }));
        this.props.scroll();
      })
      .catch(err => {
        console.log(err);
        this.setState({ status: 'error' });
      });
  };

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
    console.log(this.state.showModal);
  };

  onImageClick = e => {
    e.preventDefault();
    let imgSrc = e.target.src;
    console.log(imgSrc);
    this.setState({
      bigImg: this.state.searchResult.find(el => el.webformatURL === imgSrc),
    });
    this.toggleModal();
  };

  render() {
    if (this.state.status === 'idle') {
      return <p className={s.text}>Hello! Enter the name of the picture</p>;
    }
    if (this.state.status === 'pending') {
      return <Loader />;
    }
    if (this.state.status === 'success') {
      return (
        <>
          <ul className={s.ImageGallery}>
            <ImageGalleryItem
              searchResult={this.state.searchResult}
              onImageClick={this.onImageClick}
            />
          </ul>
          <Button onClick={this.handleClick} />
          {this.state.showModal && (
            <Modal
              toggleModal={this.toggleModal}
              bigImg={this.state.bigImg}
            ></Modal>
          )}
        </>
      );
    }
    if (this.state.status === 'error') {
      return <p className={s.text}>Something went wrong</p>;
    }
  }
}

ImageGallery.propTypes = {
  searchImageName: PropTypes.string.isRequired,
  scroll: PropTypes.func.isRequired,
};
