import React from 'react';
import classes from './App.module.scss';

import { ReactComponent as Logo } from './logo.svg';

import Filters from '../Filters/Filters';
import SortButtons from '../SortButtons/SortButtons';
import TicketsList from '../TicketsList/TicketsList';

function App() {
  return (
    <main>
      <header className={classes.logo}>
        <Logo />
      </header>
      <section className={classes.container}>
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
