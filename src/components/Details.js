import React from 'react';

const Details = ({ game }) => {
  return (
    <div className='Details'>
      <div className='game-date'>{game.date}</div>
      <div className='game-location-name'>{game.location}</div>
      <div className='game-location-address'>{game.address}</div>
    </div>
  )
}

export default Details;
