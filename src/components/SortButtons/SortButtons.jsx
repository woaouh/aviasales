/* eslint-disable no-unused-vars */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classnames from 'classnames';

import { setSortType } from '../../redux/ticketsSlice';

import classes from './SortButtons.module.scss';

const buttons = [
  { title: 'Самый дешевый', data: 'price' },
  { title: 'Самый быстрый', data: 'duration' },
];

const SortButtons = () => {
  const dispatch = useDispatch();
  const { sort } = useSelector(({ tickets }) => tickets);

  const sortBy = ({ target }) => dispatch(setSortType(target.dataset.value));

  return (
    <div className={classes.buttons}>
      {buttons.map((btn) => (
        <button
          key={btn.data}
          type="button"
          data-value={btn.data}
          className={classnames(classes.btn, {
            [classes.active]: btn.data === sort,
          })}
          onClick={sortBy}
        >
          {btn.title}
        </button>
      ))}
    </div>
  );
};

export default SortButtons;
