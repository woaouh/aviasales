import React from 'react';
import classnames from 'classnames';
import classes from './Button.module.sass';

export function Button(props) {
  const activeClass = props.className === 'active' ? true : false;
  return (
    <button
      className={classnames(classes.Btn, { [classes.Active]: activeClass })}
      onClick={props.onClick}
    >
      {props.title}
    </button>
  );
}
