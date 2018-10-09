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

  render() {
    return (
      <Router>
        <div className='App'>
          <Route exact path="/" component={Landing}/> 
          <Route exact={true} path='/:team_id' render={() => (
            <div className='container'>
              <Home metadata={this.state.metadata} nextGame={this.state.nextGame} />
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
