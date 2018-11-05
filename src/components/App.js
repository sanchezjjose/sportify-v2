import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';

import * as TeamAPI from '../api/TeamAPI';
import * as Util from '../lib/Util';

import Landing from './Landing/Landing';
import Home from './Home/Home';
import Schedule from './Schedule/Schedule';
import Footer from './Footer/Footer';

import { TeamContext } from './TeamContext';

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
          Object.entries(team.seasons).find(([key, value]) => team.seasons[key].active)[1]) || {};

        const schedule = Object.entries(season.schedule).map(([key, value]) => value);
        const orderedSchedule = Util.sortByDate(schedule);
        const nextGame = Util.getNextGame(orderedSchedule);
        const nextGameIndex = Util.getNextGameIndex(orderedSchedule);
        const metadata = {
          teamId: teamId,
          seasonId: season.id,
          gameId: nextGame.id
        };

        this.setState({
          team: team,
          schedule: orderedSchedule,
          // nextGame: nextGame,
          nextGameIndex: nextGameIndex,
          metadata: metadata
        });

        var w = window,
        d = document,
        e = d.documentElement,
        g = d.getElementsByTagName('body')[0],
        x = w.innerWidth || e.clientWidth || g.clientWidth,
        y = w.innerHeight|| e.clientHeight|| g.clientHeight;
        console.log(x + ' × ' + y);

      }).catch(err => {
        console.error('Error getting next game: ', err);
      });
    }
  }

  handleRosterChange(newRoster, gameIndex) {
    this.setState((prevState) => {
      const scheduleClone = JSON.parse(JSON.stringify(prevState.schedule));
      scheduleClone[gameIndex].roster = newRoster;

      return {
        schedule: scheduleClone
      }
    });
  }

  render() {
    return (
      <Router>
        <TeamContext.Provider value={this.state.metadata}>
          <div className='App'>
            <Route exact path="/" component={Landing}/> 
            <Route exact={true} path='/:team_id' render={() => (
              <div className='container'>
                {this.state.schedule.length > 0 && 
                  <Home schedule={this.state.schedule} nextGameIndex={this.state.nextGameIndex} handleRosterChange={this.handleRosterChange} />
                 }
                {/* <Footer teamId={this.state.team.id} /> */}
              </div>
            )}/>
            <Route exact={true} path='/:team_id/schedule' render={() => (
              <div className='container'>
                <Schedule schedule={this.state.schedule} />
                <Footer teamId={this.state.team.id} />
              </div>
            )}/>
          </div>
        </TeamContext.Provider>
      </Router>
    );
  }
}

export default App;
