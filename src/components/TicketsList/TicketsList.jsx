import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import classes from './TicketsList.module.sass';

import Ticket from '../Ticket/Ticket';

import { fetchTickets } from '../../redux/ticketsSlice';
import sortTickets from '../../redux/selectors';

export default function TicketsList() {
  const dispatch = useDispatch();
  const ticketsEntities = useSelector(({ tickets }) => tickets.entities);
  const activeFilters = useSelector(({ tickets }) => tickets.activeFilters);
  const status = useSelector(({ tickets }) => tickets.status);
  const error = useSelector(({ tickets }) => tickets.error);
  const sortedTicketsIds = useSelector(sortTickets);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTickets());
    }
  }, [status, dispatch]);

  // If length of active filtes === 0, show the message
  function allClosed() {
    const all = [];
    activeFilters.map((i) => (i.active ? all.push(i.active) : ''));
    return all.length;
  }

  let content;

  if (status === 'loading') {
    content = <div className="loader">Loading...</div>;
  } else if (status === 'failed') {
    content = (
      <div>
        {error}
        {' '}
        Try to refresh the page
      </div>
    );
  } else if (status === 'succeeded') {
    if (!allClosed()) {
      content = <div>There are no active filters</div>;
    } else {
      content = sortedTicketsIds
        .slice(0, 10)
        .map((id) => (
          <Ticket
            key={id}
            price={ticketsEntities[id].price}
            carrier={ticketsEntities[id].carrier}
            segments={ticketsEntities[id].segments}
          />
        ));
    }
  }

  return <ul className={classes.TicketsList}>{content}</ul>;
}
