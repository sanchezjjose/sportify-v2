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
      const name = e.target.value;
      const newRoster = this.props.roster.concat(name);

      this.props.handleRosterChange(newRoster);

      TeamAPI.addPlayer(
        this.props.metadata.teamId,
        this.props.metadata.seasonId,
        this.props.metadata.gameId,
        name
      );

      e.target.value = '';
    }
  }

  removePlayer(e, name) {
    const newRoster = this.props.roster.filter(n => n !== name);

    this.props.handleRosterChange(newRoster);

    TeamAPI.removePlayer(
        this.props.metadata.teamId,
        this.props.metadata.seasonId,
        this.props.metadata.gameId,
        newRoster
    );
  }

  render() {
    const roster = this.props.roster || [];

    return (
      <div className='Roster'>
        <div className='roster-title'>Roster</div>
        <div className='roster-subtitle'>{roster.length} player(s) confirmed</div>
        <div className='rsvp-form'>
          <input onKeyDown={this.addPlayer} placeholder='Enter Player Name' type='text' />
        </div>
        <div className='roster-rsvp-in-container'>
          {roster.map (name => {
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
