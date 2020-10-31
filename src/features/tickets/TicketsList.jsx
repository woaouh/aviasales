import React, { useEffect } from 'react';
import classes from './TicketsList.module.sass';
import { useSelector, useDispatch } from 'react-redux';

import { Ticket } from './Ticket';

import { fetchTickets } from './ticketsSlice';

export function TicketsList() {
  const dispatch = useDispatch();
  const tickets = useSelector((state) => state.tickets.tickets);
  const sort = useSelector((state) => state.tickets.sort);
  const activeFilters = useSelector((state) => state.tickets.activeFilters);
  const ticketsStatus = useSelector((state) => state.tickets.status);
  const error = useSelector((state) => state.tickets.error);

  useEffect(() => {
    if (ticketsStatus === 'idle') {
      dispatch(fetchTickets());
    }
  }, [ticketsStatus, dispatch]);

  let content;

  if (ticketsStatus === 'loading') {
    content = <div className='loader'>Loading...</div>;
  } else if (ticketsStatus === 'failed') {
    content = <div>{error}. Try to refresh the page</div>;
  } else if (ticketsStatus === 'succeeded') {
    let sortedTickets;
    let filteredTickets;

    if (sort === 'price') {
      sortedTickets = tickets.slice().sort((a, b) => a.price - b.price);
    } else if (sort === 'duration') {
      sortedTickets = tickets.slice().sort((a, b) => {
        return (
          a.segments[0].duration +
          a.segments[1].duration -
          (b.segments[0].duration + b.segments[1].duration)
        );
      });
    }

    const filteredValues = activeFilters
      .filter((filter) => filter.active)
      .map((filter) => filter.value);
    filteredTickets = sortedTickets.filter((ticket) =>
      filteredValues.includes(ticket.transfer)
    );

    content = filteredTickets
      .slice(0, 10)
      .map((ticket) => <Ticket key={ticket.id} {...ticket} />);
  }

  return <ul className={classes.TicketsList}>{content}</ul>;
}
