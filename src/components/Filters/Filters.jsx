import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { filterTickets } from '../../redux/ticketsSlice';

import classes from './Filters.module.scss';

const filterNames = [
  { title: 'Все' },
  { title: 'Без пересадок' },
  { title: '1 пересадка' },
  { title: '2 пересадки' },
  { title: '3 пересадки' },
];

const Filters = () => {
  const dispatch = useDispatch();
  const { activeFilters } = useSelector(({ tickets }) => tickets);

  const onFilterChange = ({ target: { checked: active, dataset: { transfer } } }) => {
    dispatch(filterTickets({ active, transfer }));
  };

  return (
    <ul className={classes.filters}>
      <h2>Количество пересадок</h2>
      {activeFilters.map((filter, index) => (
        <li key={filter.value}>
          <label className={classes.filter} htmlFor={filter.value}>
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
      ))}
    </ul>
  );
};

export default Filters;
