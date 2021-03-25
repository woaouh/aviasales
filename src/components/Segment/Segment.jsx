import React from 'react';
import PropTypes from 'prop-types';
import Pluralize from 'plural-ru';

import classes from './Segment.module.scss';
import {
  convertDateToTime, convertMinsToTime, getArrivalDate,
} from '../../helpers/helpers';

export default function Segment({ segment }) {
  const departureDate = convertDateToTime(new Date(segment.date));
  const arrivalDate = convertDateToTime(getArrivalDate(segment.date, segment.duration));
  return (
    <ul className={classes.segment} key={segment.date}>
      <li>
        <h3>
          {segment.origin}
          {' - '}
          {segment.destination}
        </h3>
        <p>
          {departureDate}
          {' - '}
          {arrivalDate}
        </p>
      </li>
      <li>
        <h3>В пути</h3>
        <p>{convertMinsToTime(segment.duration)}</p>
      </li>
      <li>
        <h3>
          {segment.stops.length}
          {' '}
          {Pluralize(
            segment.stops.length,
            'пересадка',
            'пересадки',
            'пересадοк',
          )}
        </h3>
        <p>{segment.stops.join(', ')}</p>
      </li>
    </ul>
  );
}

Segment.propTypes = {
  segment: PropTypes.objectOf(PropTypes.any).isRequired,
};
