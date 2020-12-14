import React, { useEffect } from 'react';
import classes from './Filters.module.sass';
import { useDispatch, useSelector } from 'react-redux';

import { filteredTickets } from '../../redux/ticketsSlice';

export function Filters() {
  const dispatch = useDispatch();
  const tickets = useSelector((state) => state.tickets.tickets);
  const activeFilters = useSelector((state) => state.tickets.activeFilters);

  // Checkbox filtration implementation
  useEffect(() => {
    const filterValues = [
      ...new Set(['all', ...tickets.map((ticket) => ticket.transfer)]),
    ].sort((a, b) => a - b);

    dispatch(
      filteredTickets(filterValues.map((value) => ({ active: true, value })))
    );
  }, [tickets, dispatch]);

  const onFilterChange = ({
    target: {
      checked: active,
      dataset: { transfer },
    },
  }) => {
    const newFilters = activeFilters.map((filter) =>
      [filter.value, 'all'].includes(transfer) ? { ...filter, active } : filter
    );
    const isAll = newFilters
      .filter((filter) => filter.value !== 'all')
      .every((filter) => filter.active);

    // TODO: Have to fix - Cannot assign to read only property. From isAll we get true/false
    // Fixed. Left this comment here to remember
    const resultFilters = Object.assign([...newFilters], {
      0: { active: true, value: 'all' },
    });

    resultFilters.find((filter) => filter.value === 'all').active = isAll;

    dispatch(filteredTickets(resultFilters));
  };

  const filterNames = [
    { title: 'Все' },
    { title: 'Без пересадок' },
    { title: '1 пересадка' },
    { title: '2 пересадки' },
    { title: '3 пересадки' },
  ];

  function renderFilters() {
    return activeFilters.map((filter, index) => {
      return (
        <li key={filter.value + index}>
          <label className={classes.Filter}>
            <input
              type='checkbox'
              checked={filter.active}
              data-transfer={filter.value}
              onChange={onFilterChange}
            />
            {filterNames[index].title}
          </label>
        </li>
      );
    });
  }

  return (
    <ul className={classes.Filters}>
      <h2>Количество пересадок</h2>
      {renderFilters()}
    </ul>
  );
}
