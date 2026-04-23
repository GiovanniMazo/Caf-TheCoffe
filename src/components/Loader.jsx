import React from 'react';
import '../styles/components/Loader.css';

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="loader">
        <div className="loader__cup">
          <div className="loader__steam loader__steam--1"></div>
          <div className="loader__steam loader__steam--2"></div>
          <div className="loader__steam loader__steam--3"></div>
        </div>
        <p className="loader__text">Preparando tu café...</p>
      </div>
    </div>
  );
};

export default Loader;

