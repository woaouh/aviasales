import React from 'react';
import classes from './Filter.module.sass';

export function Filter(props) {
  return (
    <li>
      <label className={classes.Filter}>
        <input
          type='checkbox'
          checked={props.active}
          data-value={props.value}
          onChange={props.onChange}
        />
        {props.title}
      </label>
    </li>
  );
}
