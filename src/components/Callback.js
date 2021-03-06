import React, { Component } from 'react';
import loader from '../assets/oval.svg';

class Callback extends Component {
  render() {
    const style = {
      position: 'absolute',
      display: 'flex',
      justifyContent: 'center',
      height: '100vh',
      width: '100vw',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: '#1f2430',
    }

    return (
      <div style={style}>
        <img src={loader} alt="loading"/>
      </div>
    );
  }
}

export default Callback;