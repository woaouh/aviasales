/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';

import classes from './Ticket.module.sass';

import Segment from '../Segment/Segment';

export default function Ticket({ price, carrier, segments }) {
  return (
    <li className={classes.Ticket}>
      <div className={classes.header}>
        <div className={classes.price}>
          {price}
          {' '}
          &#8381;
        </div>
        <img src={`https://pics.avs.io/99/36/${carrier}.png`} alt="Avia Company Logo" />
      </div>
      {/* Render Segments */}
      <div className={classes.SegmentsContainer}>
        {segments.map((segment) => (
          <Segment segment={segment} key={segment.date} />
        ))}
      </div>
    </li>
  );
}

Ticket.propTypes = {
  price: PropTypes.number.isRequired,
  carrier: PropTypes.string.isRequired,
  segments: PropTypes.arrayOf(PropTypes.object).isRequired,
};
