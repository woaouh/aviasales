import React from 'react';
import {
  getDepartureDate,
  getArrivalDate,
  convertDateToTime,
  convertMinsToTime,
} from '../../helpers/helpers';
import Pluralize from 'plural-ru';
import classes from './Ticket.module.sass';

export function Ticket(props) {
  return (
    <li className={classes.Ticket}>
      <div className={classes.header}>
        <div className={classes.price}>{props.price} &#8381;</div>
        <div>{props.carrier}</div>
      </div>
      {/* Render Segments */}
      {props.segments.map((segment, index) => {
        segment.id = index + 1;
        return (
          <ul className={classes.description} key={segment.id}>
            <li>
              <h3>
                {segment.origin} - {segment.destination}
              </h3>
              <p>{`${convertDateToTime(
                getDepartureDate(segment.date)
              )} - ${convertDateToTime(
                getArrivalDate(segment.date, segment.duration)
              )}`}</p>
            </li>
            <li>
              <h3>В пути</h3>
              <p>{convertMinsToTime(segment.duration)}</p>
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
      })}
    </li>
  );
}
