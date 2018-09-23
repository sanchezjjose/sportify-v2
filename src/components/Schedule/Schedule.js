import React from 'react';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import './Schedule.css';

const Schedule = ({ schedule }) => {
  return (
    <div className='Schedule'>
      <Navigation />
      <Header title='Schedule' />
      <div className='content-wrapper'>
        <div className='content'>
          {schedule.map(game => {
            return (
              <div key={game.date} className='game-details-wrapper'>
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
    </div>
  );
}

export default Schedule;
