import React from 'react';
import classes from './App.module.sass';

import { ReactComponent as Logo } from './logo.svg';

import Filters from '../Filters/Filters';
import SortButtons from '../SortButtons/SortButtons';
import TicketsList from '../TicketsList/TicketsList';

function App() {
  return (
    <main>
      <header className={classes.Logo}>
        <Logo />
      </header>
      <section className={classes.Container}>
        <div>
          <Filters />
        </div>
        <div>
          <SortButtons />
          <TicketsList />
        </div>
      </section>
    </main>
  );
}

export default App;
