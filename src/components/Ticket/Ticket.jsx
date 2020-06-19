import React from 'react';
import Pluralize from 'plural-ru';
import classes from './Ticket.module.sass';

export function Ticket(props) {
  // Convert duration minutes to 00ч 00м time format
  function convertMinToTime(mins) {
    let h = Math.floor(mins / 60);
    let m = mins % 60;
    h = h < 10 ? '0' + h : h;
    m = m < 10 ? '0' + m : m;
    return `${h}ч ${m}м`;
  }

  // Get Hours and Minutes from date to implement it in 00:00 time format
  function calcTime(date) {
    let h = date.getHours();
    let m = date.getMinutes();
    h = h < 10 ? '0' + h : h;
    m = m < 10 ? '0' + m : m;
    return `${h}:${m}`;
  }

  function renderSegments() {
    return props.segments.map((segment, index) => {
      const departureDate = new Date(segment.date);
      const arriveDate = new Date(segment.date);
      arriveDate.setMinutes(arriveDate.getMinutes() + segment.duration);

      return (
        <ul className={classes.description} key={index}>
          <li>
            <h3>
              {segment.origin} - {segment.destination}
            </h3>
            <p>{`${calcTime(departureDate)} - ${calcTime(arriveDate)}`}</p>
          </li>
          <li>
            <h3>В пути</h3>
            <p>{convertMinToTime(segment.duration)}</p>
          </li>
          <li>
            <h3>
              {`${segment.stops.length} 
              ${Pluralize(
                segment.stops.length,
                'пересадка',
                'пересадки',
                'пересадοк'
              )}`}
            </h3>
            <p>{segment.stops.join(', ')}</p>
          </li>
        </ul>
      );
    });
  }

  return (
    <li className={classes.Ticket}>
      <div className={classes.header}>
        <div className={classes.price}>{props.price} &#8381;</div>
        <div>{props.carrier}</div>
      </div>
      {renderSegments()}
    </li>
  );
}
