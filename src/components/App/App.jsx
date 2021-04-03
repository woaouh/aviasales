import React from 'react';

import Filters from '../Filters/Filters';
import SortButtons from '../SortButtons/SortButtons';
import TicketsList from '../TicketsList/TicketsList';

import { ReactComponent as Logo } from './logo.svg';

import classes from './App.module.scss';

const App = () => (
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

export default App;
