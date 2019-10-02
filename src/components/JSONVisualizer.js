import React, { Component } from 'react';
import data from '../data-samples/data.json'

class JSONVisualizer extends Component {
  render() {
    return (
      <div>
        <h1>JSONVisualizer</h1>
        <h1>{JSON.stringify(data)}</h1>
        <div>
          {data.map((test, index) => {
          return <div>
            <h3>{index}</h3>
            <body>{JSON.stringify(test)}</body>
          </div>
        })}
        </div>
      </div>
    );
  }
}

export default JSONVisualizer;


