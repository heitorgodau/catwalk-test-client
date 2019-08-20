import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class OneEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      oneEvent: {
        name: '',
        date: new Date(),
        imageUrl: '',
        address: '',
        description: '',
      },
      edit: false,
    };
    this.axiosBase = 'http://localhost:80/api/event';
    this.editEvent = this.editEvent.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
    this.deleteEvent = this.deleteEvent.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.getOneEvent();
  }

  getOneEvent() {
    const { id } = this.props.match.params;
    axios.get(`${this.axiosBase}/${id}`)
      .then(({ data }) => {
        const { name, date, imageUrl, address, description } = data;
        this.setState({
          id,
          oneEvent: {
            name,
            date,
            imageUrl,
            address,
            description,
          },
        });
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  editEvent() {
    const { edit } = this.state;
    this.setState({
      edit: !edit,
    });
  }

  cancelEdit() {
    this.editEvent();
    this.getOneEvent();
  }

  deleteEvent() {
    const { id } = this.state;
    axios.get(`${this.axiosBase}/delete/${id}`)
      .then(() => {
        this.props.history.push('/');
        this.props.getAllEvents();
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  handleChange(e) {
    const { name, value } = e.target;
    const copyEvent = { ...this.state.oneEvent };
    copyEvent[name] = value;
    this.setState({
      oneEvent: copyEvent,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { oneEvent, id } = this.state;
    axios.put(`${this.axiosBase}/${id}`, oneEvent)
      .then(() => {
        this.editEvent();
        this.getOneEvent();
        this.props.getAllEvents();
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  render() {
    if (this.state.id) {
      const { name, imageUrl, address, date, description } = this.state.oneEvent;
      const DateArr = date.slice(0, 10).split('-');
      DateArr.push(DateArr.shift());
      const FormatedDate = DateArr.join('-');
      return (
        (!this.state.edit)
          ? (
            <section className="one-event">
              <figure>
                <img src={imageUrl} alt="event" />
              </figure>
              <h2>{name}</h2>
              <p>{FormatedDate}</p>
              <p>{address}</p>
              <p>{description}</p>
              <div className="btns">
                <button className="btn" type="button" onClick={this.editEvent}>Edit</button>
                <button className="btn del-btn" type="button" onClick={this.deleteEvent}>Delete</button>
                <Link to="/" className="btn back-btn">Back</Link>
              </div>
            </section>
          )
          : (
            <section className="edit-event">
              <form onSubmit={e => this.handleSubmit(e)} className="edit-event event-form">
                <input type="text" name="name" placeholder="Type the event's name" value={name} onChange={e => this.handleChange(e)} />
                <input type="date" name="date" placeholder="yyyy mm dd" value={date.slice(0, 10)} onChange={e => this.handleChange(e)} />
                <input type="text" name="imageUrl" placeholder="paste here some image URL" value={imageUrl} onChange={e => this.handleChange(e)} />
                <input type="text" name="address" placeholder="Type the event's address" value={address} onChange={e => this.handleChange(e)} />
                <textarea name="description" placeholder="Type some description of this event" value={description} onChange={e => this.handleChange(e)} />
                <div className="btns">
                  <button type="submit" className="btn">Update</button>
                  <button type="button" className="btn del-btn" onClick={this.cancelEdit}>Cancel</button>
                </div>
              </form>
            </section>
          )
      );
    } return <h2>Something Goes Wrong</h2>;
  }
}

export default OneEvent;
