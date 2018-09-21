import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AWS from 'aws-sdk';

import './App.css';

import Home from './Home/Home';
import Schedule from './Schedule/Schedule';
import Navigation from './Navigation/Navigation';
import Footer from './Footer/Footer';

// TODO: consider using axios: https://github.com/axios/axios

AWS.config.update({ 
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID, 
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY
});

AWS.config.region = 'us-east-1';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      players: [],
      schedule: [],
      team: {}
    };
  }

  componentDidMount() {
    console.log('componentDidMount() called.');

    const docClient = new AWS.DynamoDB.DocumentClient();
    const teamId = window.location.pathname.split('/')[1];

    if (teamId.length > 0) {
      const params = {
        TableName: 'Teams',
        Key: {
          'id': teamId
        }
      }

      docClient.get(params, (err, data) => {
          if (err) {
            console.error('Unable to read item. Error JSON:', JSON.stringify(err, null, 2));

          } else {
            const teams = JSON.parse(JSON.stringify(data, null, 2));
            const players = (teams && teams.Item.seasons[0].schedule[0].players) || [];
            const schedule = (teams && teams.Item.seasons[0].schedule) || [];
            const team = (teams && teams.Item) || {};

            this.setState({
              players: players,
              schedule: schedule,
              team: team
            });
          }
      });
    }
  }

  render() {
    const isTeamPage = Object.keys(this.state.team).length > 0;

    return (
      <Router>
        <div className='App'> 
          <Navigation />

          {isTeamPage ? (
            <div className='container'>
              <Route exact={true} path='/:team_id' render={() => (
                <Home schedule={this.state.schedule} players={this.state.players} />
              )}/>
              <Route exact={true} path='/:team_id/schedule' render={() => (
                <Schedule schedule={this.state.schedule} />
              )}/>
              <Footer teamId={this.state.team.id} />
            </div>
            ) : (
            <div className='container'>
              Welcome to Sportify. Please visit your team page.
            </div>
          )}
        </div>
      </Router>
    );
  }
}

export default App;
