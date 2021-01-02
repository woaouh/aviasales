import React from 'react';
import PropTypes from 'prop-types';
import Pluralize from 'plural-ru';

import classes from './Segment.module.sass';
import {
  convertDateToTime, convertMinsToTime, getArrivalDate, getDepartureDate,
} from '../../helpers/helpers';

export default function Segment({ segment }) {
  return (
    <ul className={classes.Segment} key={segment.date}>
      <li>
        <h3>
          {segment.origin}
          {' - '}
          {segment.destination}
        </h3>
        <p>
          {`${convertDateToTime(getDepartureDate(segment.date))}`}
          {' - '}
          {`${convertDateToTime(getArrivalDate(segment.date, segment.duration))}`}
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
