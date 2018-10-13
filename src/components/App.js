import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';

import * as TeamAPI from '../api/TeamAPI';
import * as Util from '../lib/Util';

import Landing from './Landing/Landing';
import Home from './Home/Home';
import Schedule from './Schedule/Schedule';
import Footer from './Footer/Footer';

class App extends Component {

  constructor(props) {
    super(props);

    this.handleRosterChange = this.handleRosterChange.bind(this);

    this.state = {
      team: {},
      schedule: [],
      nextGame: {},
      metadata: {}
    };
  }

  componentDidMount() {
    const teamId = window.location.pathname.split('/')[1];

    if (teamId.length > 0) {
      TeamAPI.getTeam(teamId).then(team => {
        const season = (
          Object.keys(team.seasons).length > 0 && 
          Object.entries(team.seasons).find(([key, value]) => team.seasons[key].active)[1]
        ) || {};

        const schedule = Object.entries(season.schedule).map(([key, value]) => value);
        const orderedSchedule = Util.sortByDate(schedule);
        const nextGame = Util.getNextGame(orderedSchedule);

        this.setState({
          team: team,
          schedule: orderedSchedule,
          nextGame: nextGame,

          // TODO: Add metadata to ContextAPI if makes sense.
          metadata: {
            teamId: teamId,
            seasonId: season.id,
            gameId: nextGame.id
          }
        });

      }).catch(err => {
        console.error('Error getting next game: ', err);
      });
    }
  }

  handleRosterChange(newRoster) {
    this.setState((prevState) => {

      // TODO:
      // BUG: Need to somehow propogate changes to the 'team' and 'schedule' state.
      // Currently, team and schedule are out of sync because I am updating roster on clone.
      // Both 'team' and 'schedule' state should both also reflect updated roster.

      const nextGameClone = { ...prevState.nextGame };
      nextGameClone.roster = newRoster;

      return {
        nextGame: nextGameClone
      }
    });
  }

  render() {
    return (
      <Router>
        <div className='App'>
          <Route exact path="/" component={Landing}/> 
          <Route exact={true} path='/:team_id' render={() => (
            <div className='container'>
              <Home metadata={this.state.metadata} nextGame={this.state.nextGame} handleRosterChange={this.handleRosterChange} />
              <Footer teamId={this.state.team.id} />
            </div>
          )}/>
          <Route exact={true} path='/:team_id/schedule' render={() => (
            <div className='container'>
              <Schedule schedule={this.state.schedule} />
              <Footer teamId={this.state.team.id} />
            </div>
          )}/>
        </div>
      </Router>
    );
  }
}

export default App;
