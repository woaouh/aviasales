import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import classes from './TicketsList.module.scss';

import Ticket from '../Ticket/Ticket';

import { fetchTickets } from '../../redux/ticketsSlice';
import sortTickets from '../../redux/selectors';

export default function TicketsList() {
  const dispatch = useDispatch();
  const {
    entities, activeFilters, status, error,
  } = useSelector(({ tickets }) => tickets);
  const sortedTicketsIds = useSelector(sortTickets);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTickets());
    }
  }, [status, dispatch]);

  let content;

  if (status === 'loading') {
    content = <div className="loader">Loading...</div>;
  } else if (status === 'failed') {
    content = <div>{`${error}. Try to refresh the page`}</div>;
  } else if (status === 'succeeded') {
    const areAllActive = activeFilters.reduce((acc, i) => (i.active ? acc + 1 : acc), 0);
    if (!areAllActive) {
      content = <div>There are no active filters</div>;
    } else {
      content = sortedTicketsIds.slice(0, 10).map((id) => (
        <Ticket
          key={id}
          price={entities[id].price}
          carrier={entities[id].carrier}
          segments={entities[id].segments}
        />
      ));
    }
  }

  return <ul className={classes.tickets}>{content}</ul>;
}
