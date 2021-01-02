import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import classes from './Filters.module.sass';

import { filteredTickets } from '../../redux/ticketsSlice';

const filterNames = [
  { title: 'Все' },
  { title: 'Без пересадок' },
  { title: '1 пересадка' },
  { title: '2 пересадки' },
  { title: '3 пересадки' },
];

export default function Filters() {
  const dispatch = useDispatch();
  const activeFilters = useSelector(({ tickets }) => tickets.activeFilters);

  const onFilterChange = ({ target: { checked: active, dataset: { transfer } } }) => {
    const newFilters = activeFilters.map((filter) => ([filter.value, 'all'].includes(transfer) ? { ...filter, active } : filter));
    const isAll = newFilters.filter((filter) => filter.value !== 'all').every((filter) => filter.active);

    const resultFilters = Object.assign([...newFilters], { 0: { active: true, value: 'all' } });
    resultFilters.find((filter) => filter.value === 'all').active = isAll;

    dispatch(filteredTickets(resultFilters));
  };

  function renderFilters() {
    return activeFilters.map((filter, index) => (
      <li key={filter.value}>
        <label className={classes.Filter} htmlFor={filter.value}>
          <input
            type="checkbox"
            checked={filter.active}
            data-transfer={filter.value}
            onChange={onFilterChange}
            id={filter.value}
          />
          {filterNames[index].title}
        </label>
      </li>
    ));
  }

  return (
    <ul className={classes.Filters}>
      <h2>Количество пересадок</h2>
      {renderFilters()}
    </ul>
  );
}
