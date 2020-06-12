import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '../Button/Button'
import Ticket from '../Ticket/Ticket';
import Filter from '../Filter/Filter'
import classes from './TicketList.module.sass';

const SEARCH_ID = 'https://front-test.beta.aviasales.ru/search';
const API = 'https://front-test.beta.aviasales.ru/tickets?searchId=';

export default function TicketList() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [activeBtnFilter, setActiveBtnFilter] = useState(1);
  const [ filters, setFilters ] = useState([]);

  // {title: 'Все'},
  // {title: 'Без пересадок'},
  // {title: '1 пересадка'},
  // {title: '2 пересадки'},
  // {title: 'Вс3 пересадкие'},

  // Fetch Tickets
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const searchIdResponse = await axios.get(SEARCH_ID);
        const response = await axios.get(API + searchIdResponse.data.searchId);
        const getTickets = Object.keys(response.data.tickets).map((ticket) => response.data.tickets[ticket]);
        const result = getTickets.map((n, i) => ({ ...n, value: n.segments[0].stops.length.toString(), id: i + 1 }))
        setTickets(result.sort((a, b) => a.price - b.price))
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setIsError(true);
      }
    };
    fetchTickets();
  }, []);

  function renderTickets() {
    return filteredTickets.map((ticket, index) => {
      if (index < 10) {
        return (
          <Ticket
            key={ticket.id}
            {...ticket}
          />
        );
      }
      return null;
    });
  }

  // Checkbox filtration implementation
  useEffect(() => {
    const filterValues = [...new Set([ 'all', ...tickets.map(n => n.value)])];
    setFilters(filterValues.map((n, i) => ({ active: false, value: n, id: i + 1 })));
  }, [ tickets ]);

  const onFilterChange = ({ target: { checked: active, dataset: { value } } }) => {
    const newFilters = filters.map(n => [ n.value, 'all' ].includes(value) ? { ...n, active } : n);
    const isAll = newFilters.filter(n => n.value !== 'all').every(n => n.active);

    newFilters.find(n => n.value === 'all').active = isAll;

    setFilters(newFilters);
  };

  const filteredValues = filters.filter(filter => filter.active).map(filter => filter.value);
  const filteredTickets = tickets.filter(ticket => filteredValues.includes(ticket.value));

  function renderFilters() {
    return filters.map((filter) => {
      return (
        <Filter
          key={filter.id}
          {...filter}
          onChange={onFilterChange}
        />
      )
    })
  }

  // Buttons implementation
  function onCheapestHandler() {
    const sortedArr = tickets.sort((a, b) => a.price - b.price);
    setTickets(sortedArr)
    setActiveBtnFilter(1)
  }
  function onFastestHandler() {
    const sortedArr = tickets.sort((a, b) => (a.segments[0].duration + a.segments[1].duration) - (b.segments[0].duration + b.segments[1].duration));
    setTickets(sortedArr)
    setActiveBtnFilter(2)
  }

  function setActiveClass(num) {
    return activeBtnFilter === num ? 'active' : ' '
  }

  const buttons = [
    {title: 'Самый дешевый', className: setActiveClass(1), onClick: onCheapestHandler},
    {title: 'Самый быстрый', className: setActiveClass(2), onClick: onFastestHandler},
  ]

  function renderButtons() {
    return buttons.map((btn, index) => {
      return (
        <Button
          key={index}
          title={btn.title}
          className={btn.className}
          onClick={btn.onClick}
        />
      )
    })
  }

  console.log(filters)

  return (
    <div className={classes.container}>
      <div>
        <ul className={classes.Filters}>
          <h2>Количество пересадок</h2>
          {renderFilters()}
        </ul>
      </div>
      <div>
        {renderButtons()}
        <ul className={classes.TicketList}>
        {isError && <div>Something went wrong ...</div>}
        {loading ? <div>Loading...</div> : renderTickets()}
        </ul>
      </div>
    </div>
  );
}
