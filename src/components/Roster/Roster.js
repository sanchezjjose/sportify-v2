import React, { Component } from 'react';

import './Roster.css';
import "@material/fab/dist/mdc.fab.min.css";

// import { MDCRipple } from '@material/ripple';
import * as TeamAPI from '../../api/TeamAPI';
import { TeamContext } from '../TeamContext';

class Roster extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: ''
    };

    this.addPlayer = this.addPlayer.bind(this);
    this.removePlayer = this.removePlayer.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  // componentDidMount() {
  //   const fabRipple = new MDCRipple(document.querySelector('.mdc-fab'));
  // }

  addPlayer(e, metadata) {
    e.preventDefault();

    const playerName = this.state.name;
    const newRoster = this.props.roster.concat(playerName);

    this.props.handleRosterChange(newRoster, this.props.gameIndex);

    TeamAPI.addPlayer(
      metadata.teamId,
      metadata.seasonId,
      this.props.gameId,
      playerName
    );

    document.querySelector('.name-field').value = '';

    this.setState({ 
      name: ''
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

  handleChange(e) {
    this.setState({
      name: e.target.value
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
                <input type='text' onChange={this.handleChange} placeholder='Enter Player Name' className='name-field' />
                {this.state.name.length > 0 && 
                  <button className="mdc-fab mdc-fab--mini add-player-button" aria-label="Add">
                    <span className="mdc-fab__icon material-icons">add</span>
                  </button>
                }
              </form>
            </div>
            <div className='roster-rsvp-in-container'>
              {roster.map (name => {
                return (
                  <div key={name} className='roster-rsvp-in'>
                    <button onClick={(e) => this.removePlayer(e, name, metadata)} className="mdc-fab mdc-fab--mini roster-rsvp-out" aria-label="Remove">
                      <span className="mdc-fab__icon material-icons">remove</span>
                    </button>
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
