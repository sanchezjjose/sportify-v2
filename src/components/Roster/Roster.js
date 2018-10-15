import React, { Component } from 'react';

import './Roster.css';
import * as TeamAPI from '../../api/TeamAPI';
import { TeamContext } from '../TeamContext';

class Roster extends Component {

  constructor(props) {
    super(props);

    this.addPlayer = this.addPlayer.bind(this);
    this.removePlayer = this.removePlayer.bind(this);
  }

  addPlayer(e, metadata) {
    if (e.keyCode === 13) {
      const name = e.target.value;
      const newRoster = this.props.roster.concat(name);

      this.props.handleRosterChange(newRoster);

      TeamAPI.addPlayer(
        metadata.teamId,
        metadata.seasonId,
        metadata.gameId,
        name
      );

      e.target.value = '';
    }
  }

  removePlayer(e, name, metadata) {
    const newRoster = this.props.roster.filter(n => n !== name);

    this.props.handleRosterChange(newRoster);

    TeamAPI.removePlayer(
        metadata.teamId,
        metadata.seasonId,
        metadata.gameId,
        newRoster
    );
  }

  render() {
    const roster = this.props.roster || [];

    return (
      <TeamContext.Consumer>
        {metadata => (
          <div className='Roster'>
            <div className='roster-title'>Roster</div>
            <div className='roster-subtitle'>{roster.length} player(s) confirmed</div>
            <div className='rsvp-form'>
              <input onKeyDown={(e) => this.addPlayer(e, metadata)} placeholder='Enter Player Name' type='text' />
            </div>
            <div className='roster-rsvp-in-container'>
              {roster.map (name => {
                return (
                  <div key={name} className='roster-rsvp-in'>
                    <span onClick={(e) => this.removePlayer(e, name, metadata)} className='roster-rsvp-in-action'>[x]</span>
                    <div className='roster-rsvp-in-name'>{name}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </TeamContext.Consumer>
    );
  }
}

export default Roster;
