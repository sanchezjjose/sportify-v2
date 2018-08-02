import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import AWS from 'aws-sdk';

import homeNavIcon from './home-nav-icon.svg';
import scheduleNavIcon from './schedule-nav-icon.svg';
import './App.css';

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
    return (
    	<Router>
	      <div className='App'> 
	        <NavComponent />
	        <Route exact={true} path='/:team_id' render={() => (
	        	<HomeComponent schedule={this.state.schedule} players={this.state.players} />
	        )}/>
	        <Route exact={true} path='/:team_id/schedule' render={() => (
	        	<ScheduleComponent schedule={this.state.schedule} />
	        )}/>
          <FooterComponent teamId={this.state.team.id} />
	      </div>
	    </Router>
    );
  }
}

// TODO: Move below to separate files

const HomeComponent = ({ schedule, players }) => {
  const nextGame = (schedule.length > 0 && [].concat(schedule[0])) || [];

	return (
		<div className='container'>
			<HeaderComponent title='Pickup Game' />
	  	<div className='content'>
        {nextGame.map(game => 
          <DetailsComponent key={game.date} game={game} />
        )}
	      <div className='line-divider'></div>
	      {players.length > 0 &&
          <RosterComponent players={players} />
        }
	    </div>
	  </div>
	);
}

const ScheduleComponent = ({ schedule }) => {
	return (
		<div className='container'>
			<HeaderComponent title='Schedule' />
	    <div className='content'>
        {schedule.map(game => {
          return (
            <div key={game.date} className='Schedule'>
              <div className='game-details'>
                <div className='game-date'>{game.date}</div>
                <div className='game-location-name'>{game.location}</div>
                <div className='game-location-address'>{game.address}</div>
              </div>
              <div className='line-divider'></div>
            </div>
          );
        })}
	    </div>
    </div>
	);
}

const NavComponent = () => {
	return (
		<nav className='App-navigation'>
      <div className='App-logo'>sportify</div>
    </nav>
	);
}

const FooterComponent = ({ teamId }) => {
	return (
    <div className='footer'>
      <Link className='link-home' to={`/${teamId}`}>
        <button className='footer-home'>
            <img src={homeNavIcon} className="tab-icon" alt="home" />
            <span className='footer-text'> home </span>
        </button>
      </Link>
      <Link to={`/${teamId}/schedule`}>
        <button className='footer-schedule'>
            <img src={scheduleNavIcon} className="tab-icon" alt="schedule" />
            <span className='footer-text'> schedule </span>
        </button>
      </Link>
    </div>
	);
}

const HeaderComponent = ({ title }) => {
	return (
		<header className='App-header'>
      <div className='header-title'>
        {title}
      </div>
    </header>
	);
}

const DetailsComponent = ({ game }) => {
  return (
    <div className='Details'>
      <div className='game-date'>{game.date}</div>
      <div className='game-location-name'>{game.location}</div>
      <div className='game-location-address'>{game.address}</div>
    </div>
  )
}

class RosterComponent extends Component {

  constructor(props) {
    super(props);
    this.handleOnKeyDown = this.handleOnKeyDown.bind(this);

    this.state = {
      players: props.players 
    };
  }

  handleOnKeyDown(e) {
    // e.preventDefault();

    if (e.keyCode === 13) {
      const playerName = e.target.value;

      this.setState(prevState => ({
        players: prevState.players.concat(playerName)
      }));

      // TODO: persist data here...

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
        {this.state.players.map (name => {
          return <div key={name} className='roster-rsvp-in'>{name}</div>;
        })}
      </div>
    );
  }
}

export default App;
