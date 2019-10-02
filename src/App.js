import React, { Component } from 'react';
import './App.css';
import CartVisualizer from './components/CartVisualizer';
import MenuCtaButton from  './views/MenuCtaButton';
import NavBar from './components/Navbar';
import CartList from './components/CartList';

const App = () => {
  
  const handleOnClick = () => {
    alert('refresh')
    console.log('')
  }

  return (
      <div>
        <NavBar></NavBar>
        {/* <MenuCtaButton onClick={handleOnClick} centered={true} buttonWidth={250}/> */}
        <CartList></CartList>
        <CartVisualizer/>
      </div>
    );
}

export default App;