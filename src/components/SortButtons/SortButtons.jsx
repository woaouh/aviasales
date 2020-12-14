import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classnames from 'classnames';

import classes from './SortButtons.module.sass';

import { sortedByCheapest, sortedByFastest } from '../../redux/ticketsSlice';

export default function SortButtons() {
  const dispatch = useDispatch();
  const sort = useSelector((state) => state.tickets.sort);

  const buttons = [
    {
      title: 'Самый дешевый',
      className: sort === 'price' ? 'active' : '',
      onClick: () => dispatch(sortedByCheapest()),
      id: 1,
    },
    {
      title: 'Самый быстрый',
      className: sort === 'duration' ? 'active' : '',
      onClick: () => dispatch(sortedByFastest()),
      id: 2,
    },
  ];

  function renderButtons() {
    return buttons.map((btn) => (
      <button
        key={btn.id}
        type="button"
        className={classnames(classes.Btn, {
          [classes.Active]: btn.className,
        })}
        onClick={btn.onClick}
      >
        {btn.title}
      </button>
    ));
  }

  return <div className={classes.BtnGroup}>{renderButtons()}</div>;
}
