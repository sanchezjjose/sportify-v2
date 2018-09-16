import React from 'react';
import Header from './Header';

const Schedule = ({ schedule }) => {
  return (
    <div className='container'>
      <Header title='Schedule' />
      <div className='content'>
        {schedule.map(game => {
          return (
            <div key={game.date} className='Schedule'>
              <div className='game-details'>
                <div className='game-date'>{game.date}</div>
                <div className='game-location-name'>{game.location}</div>
                <div className='game-location-address'>{game.address}</div>
              </div>
              <div className='line-divider'></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Schedule;
