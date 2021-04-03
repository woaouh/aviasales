import React from 'react';
import PropTypes from 'prop-types';

import Segment from '../Segment/Segment';

import classes from './Ticket.module.scss';

const Ticket = ({ price, carrier, segments }) => (
  <li className={classes.ticket}>
    <div className={classes.header}>
      <div className={classes.price}>
        {price}
        {' '}
        &#8381;
      </div>
      <img src={`https://pics.avs.io/99/36/${carrier}.png`} alt="Avia Company Logo" />
    </div>
    <div className={classes.segments}>
      {segments.map((segment) => <Segment segment={segment} key={segment.date} />)}
    </div>
  </li>
);

Ticket.propTypes = {
  price: PropTypes.number.isRequired,
  carrier: PropTypes.string.isRequired,
  segments: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Ticket;
