import React, { Component } from 'react';
import './Details.css';

class Details extends Component { 

  render() {
    return (
      <div className='Details'>
        <div className='game-date'>{this.props.game.date} p.m.</div>
        <div className='game-location-name'>{this.props.game.location}</div>
        <div className='game-location-address'>{this.props.game.address}</div>
      </div>
    )
  }
}

export default Details;
