import React from 'react';
import './Button.css';
const Button = ({ loadMore }) => {
  return (
    <button className="Button" onClick={loadMore}>
      Load More
    </button>
  );
};

export default Button;
