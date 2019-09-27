import React, { Component } from 'react';
import data from '../carts.json'

const CartVisualizer = () => {
  return (
    <div>
      <h1>Carts</h1>
      <div>
        {data.map((cart, index) => 
        <div>
          <h3>Cart: {index}</h3>
          <p>{cart.driver.firstName} {cart.driver.lastName}</p>
        </div>
      )}
      </div>
    </div>
  );
}

export default CartVisualizer;


