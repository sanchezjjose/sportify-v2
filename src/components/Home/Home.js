import React, { Component } from 'react';

import Header from '../Header/Header';
import Details from '../Details/Details';
import Roster from '../Roster/Roster';
import Navigation from '../Navigation/Navigation';

import './Home.css';

class Home extends Component {

  render () {
    // TODO: determine nextGame using date comparison
    const nextGame = this.props.schedule[0] || {};
    const players = (nextGame.players) || [];

    return (
      <div className='Home'>
        <Navigation />
        <Header title={nextGame.type} />
        <div className='content-wrapper'>
          <div className='content'>
            <div className='next-game-details-wrapper'>
              <Details key={nextGame.date} game={nextGame} />
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
}

export default Home;
