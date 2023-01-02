import React, { Component } from 'react';
import './Modal.css';
import { CgClose } from 'react-icons/cg';

import { createPortal } from 'react-dom';
const modalRoot = document.querySelector('#modal_root');

class Modal extends Component {
  componentDidMount() {
    console.log('Modal did mount');
    window.addEventListener('keydown', this.handleKeyDown);
  }
  componentWillUnmount() {
    console.log('Modal will unmount');
    window.removeEventListener('keydown', this.handleKeyDown);
  }
  handleKeyDown = event => {
    console.log(event.code);
    if (event.code === 'Escape') {
      console.log('esc');
      this.props.onClose();
    }
  };
  handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      console.log('backdrop');
      this.props.onClose();
    }
  };
  render() {
    return createPortal(
      <div className="overlay" onClick={this.handleBackdropClick}>
        <div className="modal">
          <button
            className="close__button"
            type="button"
            onClick={this.props.onClose}
          >
            <CgClose className="icon__close" size="40" />
          </button>
          {this.props.children}
        </div>
      </div>,
      modalRoot
    );
  }
}

export default Modal;
