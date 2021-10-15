import PropTypes from 'prop-types';
import React, { Component } from 'react';
import s from '../ImageGalleryItem/ImageGalleryItem.module.css';

export default class ImageGalleryItem extends Component {
  render() {
    return this.props.searchResult.map(el => (
      <li className={s.ImageGalleryItem} key={el.id}>
        <img
          src={el.webformatURL}
          alt={el.tags}
          className={s.ImageGalleryItem__image}
          onClick={this.props.onImageClick}
        />
      </li>
    ));
  }
}

ImageGalleryItem.propTypes = {
  searchResult: PropTypes.array.isRequired,
  onImageClick: PropTypes.func.isRequired,
};
