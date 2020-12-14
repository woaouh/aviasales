import React from 'react';
import classnames from 'classnames';
import classes from './SortButtons.module.sass';

import { useDispatch, useSelector } from 'react-redux';

import { sortedByCheapest, sortedByFastest } from '../../redux/ticketsSlice';

export function SortButtons() {
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
    return buttons.map((btn) => {
      return (
        <button
          key={btn.id}
          className={classnames(classes.Btn, {
            [classes.Active]: btn.className,
          })}
          onClick={btn.onClick}
        >
          {btn.title}
        </button>
      );
    });
  }

  return <div className={classes.BtnGroup}>{renderButtons()}</div>;
}
