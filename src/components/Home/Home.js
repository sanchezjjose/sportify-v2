import React, { Component } from 'react';

import Header from '../Header/Header';
import Details from '../Details/Details';
import Roster from '../Roster/Roster';
import Navigation from '../Navigation/Navigation';

import './Home.css';

class Home extends Component {
  render () {
    return (
      <div className='Home'>
        <Navigation />
        <Header title={this.props.nextGame.type} />
        <div className='content-wrapper'>
          <div className='content'>
            <div className='next-game-details-wrapper'>
              <Details game={this.props.nextGame} />
              <div className='line-divider'></div>
              <Roster metadata={this.props.metadata} roster={this.props.nextGame.players} handleRosterChange={this.props.handleRosterChange} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
