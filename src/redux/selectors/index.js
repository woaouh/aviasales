import { createSelector } from '@reduxjs/toolkit';

function filterTickets(ids, tickets, activeFilters) {
  const filteredValues = activeFilters.filter((filter) => filter.active)
    .map((filter) => filter.value);
  const filteredTickets = ids.filter((id) => filteredValues.includes(tickets[id].transfer));
  return filteredTickets;
}

const sortTickets = createSelector(
  [
    ({ tickets }) => tickets.sort,
    ({ tickets }) => tickets.ids,
    ({ tickets }) => tickets.entities,
    ({ tickets }) => tickets.activeFilters,
  ],
  (sort, ids, entities, activeFilters) => {
    const filteredTickets = filterTickets(ids, entities, activeFilters);
    switch (sort) {
      case 'price':
        return filteredTickets.slice().sort((a, b) => entities[a].price - entities[b].price);
      case 'duration':
        return filteredTickets.slice().sort((a, b) => (
          (entities[a].segments[0].duration + entities[a].segments[1].duration)
          - (entities[b].segments[0].duration + entities[b].segments[1].duration)
        ));
      default:
        return entities;
    }
  },
);

export default sortTickets;
