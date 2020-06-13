import React from 'react';
import classes from './Filter.module.sass';

export default function Filter(props) {
  return (
    <li className={classes.Filter}>
      <label className='filter'>
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
