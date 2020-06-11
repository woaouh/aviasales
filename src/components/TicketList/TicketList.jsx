import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Ticket from '../Ticket/Ticket';
import classes from './TicketList.module.sass';

const SEARCH_ID = 'https://front-test.beta.aviasales.ru/search';
const API = 'https://front-test.beta.aviasales.ru/tickets?searchId=';

export default function TicketList() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const searchIdResponse = await axios.get(SEARCH_ID);
        const response = await axios.get(API + searchIdResponse.data.searchId);
        const getTickets = Object.keys(response.data.tickets).map((ticket) => response.data.tickets[ticket]);
        setTickets(getTickets);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setIsError(true);
      }
    };
    fetchTickets();
  }, []);

  function renderTickets(tickets) {
    return tickets.map((ticket, index) => {
      if (index < 1) {
        return (
          <Ticket
            key={index}
            price={ticket.price
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}
            carrier={ticket.carrier}
            segments={ticket.segments}
          />
        );
      }
      return null;
    });
  }

  return (
    <ul className={classes.TicketList}>
       {isError && <div>Something went wrong ...</div>}
      {loading ? <div>Loading...</div> : renderTickets(tickets)}
    </ul>
  );
}
