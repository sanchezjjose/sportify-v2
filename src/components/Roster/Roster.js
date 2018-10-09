import React, { Component } from 'react';

import './Roster.css';
import * as TeamAPI from '../../api/TeamAPI';

class Roster extends Component {

  constructor(props) {
    super(props);
    this.handleOnKeyDown = this.handleOnKeyDown.bind(this);

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
            return <div key={name} className='roster-rsvp-in'>{name}</div>;
          })}
        </div>
      </div>
    );
  }
}

export default Roster;
