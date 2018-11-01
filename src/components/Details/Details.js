import React, { Component } from 'react';
import './Details.css';

class Details extends Component { 

  render() {
    const address = encodeURI(this.props.game.address);
    const url = `https://www.google.com/maps/search/?api=1&query=${address}`;

    return (
      <div className='Details'>
        <div className='game-date'>{this.props.game.date} p.m.</div>
        <div className='game-location-name'>{this.props.game.location}</div>
        <a className='game-location-address' href={url} target="_blank">{this.props.game.address}</a>
      </div>
    )
  }
}

export default Details;
