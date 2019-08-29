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
    this.axiosBase = 'http://localhost:5000/api';
    this.getAllEvents = this.getAllEvents.bind(this);
  }

  componentDidMount() {
    this.getAllEvents();
  }

  async getAllEvents() {
    try {
      const { data } = await axios.get(`${this.axiosBase}/events`);
      this.setState({
        allEvents: data,
      });
    } catch (err) {
      throw new Error(err);
    }
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
                <NewEvent axiosBase={this.axiosBase} getAllEvents={this.getAllEvents} />
              </>
            )}
          />
          <Route path="/event/:id" render={props => <OneEvent {...props} axiosBase={this.axiosBase} getAllEvents={this.getAllEvents} />} />
        </Switch>
      </>
    );
  }
}

export default App;
