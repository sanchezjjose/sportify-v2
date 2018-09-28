import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';

import { getTeam } from '../api/TeamAPI';
import Landing from './Landing/Landing';
import Home from './Home/Home';
import Schedule from './Schedule/Schedule';
import Footer from './Footer/Footer';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      team: {},
      schedule: []
    };
  }

  componentDidMount() {
    const teamId = window.location.pathname.split('/')[1];

    if (teamId.length > 0) {
      getTeam(teamId).then(team => {
        // TODO: get active season based on active boolean
        const currentSeason = (team.seasons.length > 0 && team.seasons[0]) || {};
        const schedule = currentSeason.schedule;

        this.setState({
          team: team,
          schedule: schedule  
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
              <Home schedule={this.state.schedule} />
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
