import React, { Component } from 'react';

import './Roster.css';
import * as TeamAPI from '../../api/TeamAPI';

class Roster extends Component {

  constructor(props) {
    super(props);
    this.handleOnKeyDown = this.handleOnKeyDown.bind(this);
    this.removePlayer = this.removePlayer.bind(this);

    this.state = {
      players: props.players 
    };
  }

  handleOnKeyDown(e) {
    if (e.keyCode === 13) {
      const playerName = e.target.value;

      this.setState(prevState => ({
        players: prevState.players.concat(playerName)
      }));

      TeamAPI.addPlayer(
        this.props.metadata.teamId,
        this.props.metadata.seasonId,
        this.props.metadata.gameId,
        playerName
      );

      e.target.value = '';
    }
  }

  removePlayer(e) {
    console.log('Removing player...');
    console.log(this.props);
  }

  render() {
    return (
      <div className='Roster'>
        <div className='roster-title'>Roster</div>
        <div className='roster-subtitle'>{this.state.players.length} player(s) confirmed</div>
        <div className='rsvp-form'>
          <input onKeyDown={this.handleOnKeyDown} placeholder='Enter Player Name' type='text' />
        </div>
        <div className='roster-rsvp-in-container'>
          {this.state.players.map (name => {
            return (
              <div key={name} className='roster-rsvp-in'>
                <span onClick={this.removePlayer} className='roster-rsvp-in-action'>[x]</span>
                <div className='roster-rsvp-in-name'>{name}</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Roster;
