import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Ticket from '../Ticket/Ticket';

import { fetchTickets } from '../../redux/ticketsSlice';
import sortTickets from '../../redux/selectors';

import classes from './TicketsList.module.scss';

const TicketsList = () => {
  const dispatch = useDispatch();
  const {
    entities, activeFilters, status, error,
  } = useSelector(({ tickets }) => tickets);
  const sortedTicketsIds = useSelector(sortTickets);

  useEffect(() => dispatch(fetchTickets()), []);

  const renderTickets = () => {
    const areAllFiltersActive = activeFilters.some((filter) => filter.active);
    return !areAllFiltersActive
      ? <div>There are no active filters</div>
      : sortedTicketsIds.slice(0, 10).map((id) => (
        <Ticket
          key={id}
          price={entities[id].price}
          carrier={entities[id].carrier}
          segments={entities[id].segments}
        />
      ));
  };

  return (
    <ul className={classes.tickets}>
      {status === 'loading' && <div className="loader">Loading...</div>}
      {status === 'failed' && <div>{`${error}. Try to refresh the page`}</div>}
      {renderTickets()}
    </ul>
  );
};

export default TicketsList;
