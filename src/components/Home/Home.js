import React, { Component } from 'react';

import Header from '../Header/Header';
import Details from '../Details/Details';
import Roster from '../Roster/Roster';
import Navigation from '../Navigation/Navigation';

import './Home.css';

class Home extends Component {

  componentDidMount () {
    console.log('Home component mounted...');
  }

  render () {
    // TODO: this should be a single object
    const nextGame = (this.props.schedule.length > 0 && [].concat(this.props.schedule[0])) || [];

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

              {this.props.players.length > 0 &&
                <Roster players={this.props.players} />
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
