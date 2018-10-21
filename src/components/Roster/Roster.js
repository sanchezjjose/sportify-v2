import React, { Component } from 'react';

import './Roster.css';
import * as TeamAPI from '../../api/TeamAPI';
import { TeamContext } from '../TeamContext';

class Roster extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showAddPlayerBtn: false
    };

    this.addPlayer = this.addPlayer.bind(this);
    this.removePlayer = this.removePlayer.bind(this);
    this.shouldShowButton = this.shouldShowButton.bind(this);
  }

  addPlayer(e, metadata) {
    e.preventDefault();

    const selector = e.target.querySelector('input');
    const name = selector.value;
    const newRoster = this.props.roster.concat(name);

    this.props.handleRosterChange(newRoster, this.props.gameIndex);

    TeamAPI.addPlayer(
      metadata.teamId,
      metadata.seasonId,
      this.props.gameId,
      name
    );

    selector.value = '';

    this.setState({ 
      showAddPlayerBtn: false
    });
  }

  removePlayer(e, name, metadata) {
    const newRoster = this.props.roster.filter(n => n !== name);

    this.props.handleRosterChange(newRoster, this.props.gameIndex);

    TeamAPI.removePlayer(
        metadata.teamId,
        metadata.seasonId,
        this.props.gameId,
        newRoster
    );
  }

  shouldShowButton(e) {
    this.setState({ 
      showAddPlayerBtn: e.target.value.length > 0 
    });
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
              <form onSubmit={e => this.addPlayer(e, metadata)}>
                <input type='text' onChange={this.shouldShowButton} placeholder='Enter Player Name' className='name-field' />
                {this.state.showAddPlayerBtn && 
                  <a onClick={this.form.submit} className="btn-floating btn-large waves-effect waves-light red"><i className="material-icons">add</i></a>
                  // <button className='btn waves-effect waves-light' type='submit' name='action'>(+)
                    // { <i className='add-player-button material-icons'>arrow_back_ios</i> }
                  // </button>
                }
              </form>
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
