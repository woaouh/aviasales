import React from 'react';
import classes from './App.module.sass';

import { ReactComponent as Logo } from './logo.svg';

import { Filters } from './features/tickets/Filters';
import { SortButtons } from './features/tickets/SortButtons';
import { TicketsList } from './features/tickets/TicketsList';

function App() {
  return (
    <div>
      <div className={classes.Logo}>
        <Logo />
      </div>
      <div className={classes.Container}>
        <div>
          <Filters />
        </div>
        <div>
          <SortButtons />
          <TicketsList />
        </div>
      </div>
    </div>
  );
}

export default App;
