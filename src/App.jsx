import React from 'react';
import classes from './App.module.sass';
import { Filters } from './features/tickets/Filters';

import { SortButtons } from './features/tickets/SortButtons';
import { TicketsList } from './features/tickets/TicketsList';

function App() {
  return (
    <div className={classes.Container}>
      <div>
        <Filters />
      </div>
      <div>
        <SortButtons />
        <TicketsList />
      </div>
    </div>
  );
}

export default App;
