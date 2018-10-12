import React, { Component } from 'react';

import './Roster.css';
import * as TeamAPI from '../../api/TeamAPI';

class Roster extends Component {

  constructor(props) {
    super(props);
    this.handleOnKeyDown = this.handleOnKeyDown.bind(this);
    this.removePlayer = this.removePlayer.bind(this);

    // this.state = {
    //   players: props.nextGame.players 
    // };
  }

  handleOnKeyDown(e) {
    if (e.keyCode === 13) {
      const player = e.target.value;

      // this.setState(prevState => {
      //   const updatedRoster = prevState.players.concat(player);
      //   this.props.handleRosterChange(updatedRoster);

      //   return { players: updatedRoster };
      // });

      this.props.nextGame.players.concat(player);
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
    // const newPlayers = this.state.players.filter(p => p !== player);

    // this.setState({
    //   players: newPlayers
    // });

    // this.props.handleRosterChange(this.state.players);

    const newPlayers = this.props.nextGame.players.filter(p => p !== player);
    this.props.nextGame.players = newPlayers;

    this.props.handleRosterChange(this.props.nextGame);

    TeamAPI.removePlayer(
        this.props.metadata.teamId,
        this.props.metadata.seasonId,
        this.props.metadata.gameId,
        newPlayers
    );
  }

  render() {
    return (
      <div className='Roster'>
        <div className='roster-title'>Roster</div>
        {/* <div className='roster-subtitle'>{this.state.players.length} player(s) confirmed</div> */}
        <div className='roster-subtitle'>{this.props.nextGame.players.length} player(s) confirmed</div>
        <div className='rsvp-form'>
          <input onKeyDown={this.handleOnKeyDown} placeholder='Enter Player Name' type='text' />
        </div>
        <div className='roster-rsvp-in-container'>
          {/* {this.state.players.map (name => { */}
          {this.props.nextGame.players.map (name => {
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
