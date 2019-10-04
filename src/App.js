import React from 'react';
import './App.css';
import CartVisualizer from './components/CartVisualizer';
import NavBar from './components/Navbar';
import CartList from './components/CartList';

const App = () => {

  return (
      <div>
        <NavBar></NavBar>
        <CartList></CartList>
        <CartVisualizer/>
      </div>
    );
}

export default App;