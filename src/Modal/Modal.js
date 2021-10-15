import { Component } from 'react';
import PropTypes from 'prop-types';
import s from '../Modal/Modal.module.css';

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDownClose);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDownClose);
  }
  handleKeyDownClose = e => {
    if (e.code === 'Escape') {
      this.props.toggleModal();
    }
  };
  handleBackdropClose = e => {
    if (e.currentTarget === e.target) {
      this.props.toggleModal();
    }
  };

  render() {
    return (
      <div onClick={this.handleBackdropClose} className={s.Overlay}>
        <div className={s.Modal}>
          <img
            className={s.Img}
            src={this.props.bigImg.largeImageURL}
            alt={this.props.bigImg.tags}
          />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  bigImg: PropTypes.object.isRequired,
};
