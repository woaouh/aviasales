import React from 'react';
import classes from './Filter.module.sass';

// {title: 'Все'},
// {title: 'Без пересадок'},
// {title: '1 пересадка'},
// {title: '2 пересадки'},
// {title: '3 пересадки'},

export default function Filter(props) {
  return (
    <li className={classes.Filter}>
      <label className="filter">
        <input type="checkbox" checked={props.active} data-value={props.value} onChange={props.onChange} />
        {props.title}
      </label>
    </li>
  );
}