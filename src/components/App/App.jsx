import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import axios from 'axios';
import AllEvents from '../Events';
import NewEvent from '../Events/NewEvent';
import OneEvent from '../Events/OneEvent';
import './app.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      allEvents: [],
    };
    this.getAllEvents = this.getAllEvents.bind(this);
  }

  componentDidMount() {
    this.getAllEvents();
  }

  getAllEvents() {
    axios.get('http://catwalktestserver-env.9ivv2x5vie.us-west-1.elasticbeanstalk.com/api/events')
      .then(({ data }) => {
        this.setState({
          allEvents: data,
        });
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  render() {
    return (
      <>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <>
                <h1>This is all Events in this moment:</h1>
                <AllEvents allEvents={this.state.allEvents} />
                <NewEvent getAllEvents={this.getAllEvents} />
              </>
            )}
          />
          <Route path="/event/:id" render={(props) => <OneEvent {...props} getAllEvents={this.getAllEvents} />} />
        </Switch>
      </>
    );
  }
}

export default App;
