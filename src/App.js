import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import JSONVisualizer from './views/JSONVisualizer'
import CartVisualizer from './views/CartVisualizer'
import MenuCtaButton from  './views/MenuCtaButton'

const App = () => {
  
  const handleOnClick = () => {
    alert('clicked')
  }
  
  return (
      <div>
        <MenuCtaButton onClick={handleOnClick}/>
        <CartVisualizer/>
      </div>
    );
}

export default App;

