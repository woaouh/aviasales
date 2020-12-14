import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import classes from './TicketsList.module.sass';

import Ticket from '../Ticket/Ticket';

import { fetchTickets } from '../../redux/ticketsSlice';

export default function TicketsList() {
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

  function allClosed() {
    // If length of active filtes ==== 0, show the message
    const all = [];
    activeFilters.map((i) => (i.active ? all.push(i.active) : ''));
    return all.length;
  }

  let content;

  if (ticketsStatus === 'loading') {
    content = <div className="loader">Loading...</div>;
  } else if (ticketsStatus === 'failed') {
    content = (
      <div>
        {error}
        . Try to refresh the page
      </div>
    );
  } else if (ticketsStatus === 'succeeded') {
    let sortedTickets;
    let filteredTickets;

    if (sort === 'price') {
      sortedTickets = tickets.slice().sort((a, b) => a.price - b.price);
    } else if (sort === 'duration') {
      sortedTickets = tickets.slice().sort((a, b) => (
        a.segments[0].duration
        + a.segments[1].duration
        - (b.segments[0].duration + b.segments[1].duration)
      ));
    }

    if (!allClosed()) {
      content = <div>There are no active filters</div>;
    } else {
      const filteredValues = activeFilters
        .filter((filter) => filter.active)
        .map((filter) => filter.value);
      filteredTickets = sortedTickets.filter((ticket) => filteredValues.includes(ticket.transfer));

      content = filteredTickets
        .slice(0, 10)
        .map((ticket) => (
          <Ticket
            key={ticket.id}
            price={ticket.price}
            carrier={ticket.carrier}
            segments={ticket.segments}
          />
        ));
    }
  }

  return <ul className={classes.TicketsList}>{content}</ul>;
}
