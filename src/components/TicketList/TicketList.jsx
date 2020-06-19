import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '../Button/Button';
import { Ticket } from '../Ticket/Ticket';
import { Filter } from '../Filter/Filter';
import classes from './TicketList.module.sass';

const SEARCH_ID = 'https://front-test.beta.aviasales.ru/search';
const API = 'https://front-test.beta.aviasales.ru/tickets?searchId=';

export function TicketList() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [activeBtnFilter, setActiveBtnFilter] = useState(1);
  const [activeFilters, setActiveFilters] = useState([]);

  // Fetch Tickets
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const searchIdResponse = await axios.get(SEARCH_ID);
        const response = await axios.get(API + searchIdResponse.data.searchId);
        const tickets = Object.keys(response.data.tickets).map(
          (ticket) => response.data.tickets[ticket]
        );
        // Set value from stops.length for appropriate filtering
        const result = tickets.map((n, i) => ({
          ...n,
          value:
            n.segments[0].stops.length === n.segments[1].stops.length
              ? n.segments[0].stops.length.toString()
              : 'all',
          id: i + 1,
        }));
        setTickets(result.sort((a, b) => a.price - b.price));
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
        return <Ticket key={ticket.id} {...ticket} />;
      }
      return null;
    });
  }

  // Checkbox filtration implementation
  useEffect(() => {
    const filterValues = [
      ...new Set(['all', ...tickets.map((ticket) => ticket.value)]),
    ];
    setActiveFilters(
      filterValues.map((value, i) => ({
        active: true,
        value: value,
        id: i + 1,
      }))
    );
  }, [tickets]);

  const onFilterChange = ({
    target: {
      checked: active,
      dataset: { value },
    },
  }) => {
    const newFilters = activeFilters.map((filter) =>
      [filter.value, 'all'].includes(value) ? { ...filter, active } : filter
    );
    const isAll = newFilters
      .filter((filter) => filter.value !== 'all')
      .every((filter) => filter.active);

    newFilters.find((filter) => filter.value === 'all').active = isAll;

    setActiveFilters(newFilters);
  };

  const filteredValues = activeFilters
    .filter((filter) => filter.active)
    .map((filter) => filter.value);
  const filteredTickets = tickets.filter((ticket) =>
    filteredValues.includes(ticket.value)
  );

  const filterNames = [
    { title: 'Все' },
    { title: 'Без пересадок' },
    { title: '1 пересадка' },
    { title: '2 пересадки' },
    { title: '3 пересадки' },
  ];

  function renderFilters() {
    const sortedArr = activeFilters.sort((a, b) => a.value - b.value);
    return sortedArr.map((filter, index) => {
      return (
        <Filter
          key={filter.id}
          title={filterNames[index].title}
          {...filter}
          onChange={onFilterChange}
        />
      );
    });
  }

  // Buttons implementation
  function onCheapestHandler() {
    const sortedArr = tickets.sort((a, b) => a.price - b.price);
    setTickets(sortedArr);
    setActiveBtnFilter(1);
  }
  function onFastestHandler() {
    const sortedArr = tickets.sort(
      (a, b) =>
        a.segments[0].duration +
        a.segments[1].duration -
        (b.segments[0].duration + b.segments[1].duration)
    );
    setTickets(sortedArr);
    setActiveBtnFilter(2);
  }

  function setActiveClass(num) {
    return activeBtnFilter === num ? 'active' : '';
  }

  const buttons = [
    {
      title: 'Самый дешевый',
      className: setActiveClass(1),
      onClick: onCheapestHandler,
      id: 1,
    },
    {
      title: 'Самый быстрый',
      className: setActiveClass(2),
      onClick: onFastestHandler,
      id: 2,
    },
  ];

  function renderButtons() {
    return buttons.map((btn) => {
      return (
        <Button
          key={btn.id}
          title={btn.title}
          className={btn.className}
          isActive={btn.isActive}
          onClick={btn.onClick}
        />
      );
    });
  }

  return (
    <div className={classes.Container}>
      <div>
        <ul className={classes.Filters}>
          <h2>Количество пересадок</h2>
          {renderFilters()}
        </ul>
      </div>
      <div>
        {renderButtons()}
        <ul className={classes.TicketList}>
          {isError && <div>Something went wrong...</div>}
          {loading ? <div>Loading...</div> : renderTickets()}
        </ul>
      </div>
    </div>
  );
}
