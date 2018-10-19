import React, { Component } from 'react';

import Header from '../Header/Header';
import Details from '../Details/Details';
import Roster from '../Roster/Roster';
import Navigation from '../Navigation/Navigation';

import * as Util from '../../lib/Util';

import './Home.css';

class Home extends Component {

  state = {
    gameIndex: null
  }

  handleScheduleChange = (e) => {
    e.preventDefault();

    console.log(e.target.className);
    console.log('Arrow clicked');

    this.setState({
      gameIndex: 4
    });
  }

  render () {
    const schedule = this.props.schedule;
    const gameIndex = this.state.gameIndex != null ? this.state.gameIndex : Util.getNextGameIndex(schedule);
    const game = gameIndex > 0 ? schedule[gameIndex] : {};

    return (
      <div className='Home'>
        <Navigation />
          <Header title={game.type} />
          <div className='content-wrapper'>
            <div onClick={e => this.handleScheduleChange(e)} className='prev-game-arrow nav-arrow'>
              <i className='material-icons md-dark md-inactive'>arrow_back_ios</i>
            </div>
            <div className='content'>
              <div className='next-game-details-wrapper'>
                <Details game={game} />
                <div className='line-divider'></div>
                <Roster roster={game.roster} handleRosterChange={this.props.handleRosterChange} />
              </div>
            </div>
            <div onClick={e => this.handleScheduleChange(e)} className='next-game-arrow nav-arrow'>
              <i className='material-icons'>arrow_forward_ios</i>
            </div>
          </div>
      </div>
    );
  }
}

export default Home;
