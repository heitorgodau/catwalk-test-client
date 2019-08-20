import React, { Component } from 'react';
import axios from 'axios';

class NewEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      date: new Date(),
      imageUrl: '',
      address: '',
      description: '',
    };
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    axios.post('http://catwalktestserver-env.9ivv2x5vie.us-west-1.elasticbeanstalk.com/api/create-event', this.state)
      .then(() => {
        this.props.getAllEvents();
        this.setState({
          name: '',
          date: new Date(),
          imageUrl: '',
          address: '',
          description: '',
        });
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  render() {
    const { name, date, imageUrl, address, description } = this.state;
    return (
      <form className="new-event event-form" onSubmit={e => this.handleSubmit(e)}>
        <input type="text" name="name" placeholder="Type the event's name" value={name} onChange={e => this.handleChange(e)} />
        <input type="date" name="date" placeholder="yyyy mm dd" value={date} onChange={e => this.handleChange(e)} />
        <input type="text" name="imageUrl" placeholder="paste here some image URL" value={imageUrl} onChange={e => this.handleChange(e)} />
        <input type="text" name="address" placeholder="Type the event's address" value={address} onChange={e => this.handleChange(e)} />
        <textarea name="description" placeholder="Type some description of this event" value={description} onChange={e => this.handleChange(e)} />
        <button type="submit" className="btn">Create a new event</button>
      </form>
    );
  }
}

export default NewEvent;
