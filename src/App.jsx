import React from 'react';
import classes from './App.module.sass';
import { TicketList } from './components/TicketList/TicketList';

export function App() {
  return (
    <div className={classes.App}>
      <div className={classes.Container}>
        <TicketList />
      </div>
    </div>
  );
}
