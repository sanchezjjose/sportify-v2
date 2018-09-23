import React from 'react';

import Header from '../Header/Header';
import Details from '../Details/Details';
import Roster from '../Roster/Roster';
import Navigation from '../Navigation/Navigation';
import './Home.css';

const Home = ({ schedule, players }) => {
  const nextGame = (schedule.length > 0 && [].concat(schedule[0])) || [];

  return (
    <div className='Home'>
      <Navigation />
      <Header title='Pickup Game' />
      <div className='content-wrapper'>
        <div className='content'>
          <div className='next-game-details-wrapper'>
            {nextGame.map(game => 
              <Details key={game.date} game={game} />
            )}

            <div className='line-divider'></div>

            {players.length > 0 &&
              <Roster players={players} />
            }
          </div>
        </div>
      </div>
    </div>
    );
}

export default Home;
