import React, { Component } from 'react';

import './Roster.css';
import * as TeamAPI from '../../api/TeamAPI';

class Roster extends Component {

  constructor(props) {
    super(props);

    this.addPlayer = this.addPlayer.bind(this);
    this.removePlayer = this.removePlayer.bind(this);
  }

  addPlayer(e) {
    if (e.keyCode === 13) {
      const player = e.target.value;
      const updatedRoster = this.props.nextGame.players.concat(player);

      this.props.nextGame.players = updatedRoster;
      this.props.handleRosterChange(this.props.nextGame);

      TeamAPI.addPlayer(
        this.props.metadata.teamId,
        this.props.metadata.seasonId,
        this.props.metadata.gameId,
        player
      );

      e.target.value = '';
    }
  }

  removePlayer(e, player) {
    const updatedRoster = this.props.nextGame.players.filter(p => p !== player);
    this.props.nextGame.players = updatedRoster;

    this.props.handleRosterChange(this.props.nextGame);

    TeamAPI.removePlayer(
        this.props.metadata.teamId,
        this.props.metadata.seasonId,
        this.props.metadata.gameId,
        updatedRoster
    );
  }

  render() {
    const players = this.props.nextGame.players || [];

    return (
      <div className='Roster'>
        <div className='roster-title'>Roster</div>
        <div className='roster-subtitle'>{players.length} player(s) confirmed</div>
        <div className='rsvp-form'>
          <input onKeyDown={this.addPlayer} placeholder='Enter Player Name' type='text' />
        </div>
        <div className='roster-rsvp-in-container'>
          {players.map (name => {
            return (
              <div key={name} className='roster-rsvp-in'>
                <span onClick={(e) => this.removePlayer(e, name)} className='roster-rsvp-in-action'>[x]</span>
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
