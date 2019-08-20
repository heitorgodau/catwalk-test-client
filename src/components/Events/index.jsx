import React from 'react';
import { Link } from 'react-router-dom';
import './event.css';

export default ({ allEvents }) => (
  <section id="all-events">
    <h2>All Events</h2>
    <div className="events">
      {
      (allEvents.length !== 0)
        ? allEvents.map(({ name, date, imageUrl, _id }) => {
          const DateArr = date.slice(0, 10).split('-');
          DateArr.push(DateArr.shift());
          const FormatedDate = DateArr.join('-');
          return (
            <div className="event-card" key={_id}>
              <Link to={`/event/${_id}`}>
                <figure><img src={imageUrl} alt="Event" /></figure>
                <h3>{name}</h3>
                <p>{FormatedDate}</p>
              </Link>
            </div>
          );
        }) : <h3>There is no event right now</h3>
      }
    </div>
  </section>
);
