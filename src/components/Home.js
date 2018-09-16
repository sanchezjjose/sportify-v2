import React from 'react';

import Header from './Header';
import Details from './Details';
import Roster from './Roster';

const Home = ({ schedule, players }) => {
  const nextGame = (schedule.length > 0 && [].concat(schedule[0])) || [];

  return (
    <div className='container'>
      <Header title='Pickup Game' />
      <div className='content'>
        {nextGame.map(game => 
          <Details key={game.date} game={game} />
        )}

        <div className='line-divider'></div>

        {players.length > 0 &&
          <Roster players={players} />
        }
      </div>
    </div>
    );
}

export default Home;
