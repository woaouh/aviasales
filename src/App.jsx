import React from 'react';
import classes from './App.module.sass';
import TicketList from './components/TicketList/TicketList';

export default function App() {
  return (
    <div className={classes.App}>
      <TicketList />
    </div>
  );
}
