/* eslint-disable no-param-reassign */
import {
  createAsyncThunk, createSlice, createEntityAdapter, nanoid,
} from '@reduxjs/toolkit';

const ticketsAdapter = createEntityAdapter({
  selectId: (ticket) => ticket.id,
  sortComparer: (a, b) => a.price - b.price,
});

const SEARCH_ID_API = 'https://front-test.beta.aviasales.ru/search';
const API = 'https://front-test.beta.aviasales.ru/tickets?searchId=';

export const fetchTickets = createAsyncThunk(
  'tickets/fetchTickets',
  async () => {
    const searchIdResponse = await fetch(SEARCH_ID_API)
      .then((rspns) => rspns.json())
      .then((data) => data.searchId);
    const response = await fetch(API + searchIdResponse)
      .then((rspns) => rspns.json())
      .then((data) => data.tickets);
    return response;
  },
);

export const ticketsSlice = createSlice({
  name: 'tickets',
  initialState: ticketsAdapter.getInitialState({
    status: 'idle',
    sort: 'price',
    activeFilters: [
      { active: true, value: 'all' },
      { active: true, value: '0' },
      { active: true, value: '1' },
      { active: true, value: '2' },
      { active: true, value: '3' },
    ],
    error: null,
  }),
  reducers: {
    setSortType: (state, { payload }) => { state.sort = payload; },
    filterTickets: (state, { payload }) => {
      const newFilters = state.activeFilters.map((filter) => (
        [filter.value, 'all'].includes(payload.transfer) ? { ...filter, active: payload.active } : filter
      ));
      const isAll = newFilters.filter((filter) => filter.value !== 'all').every((filter) => filter.active);

      const resultFilters = Object.assign([...newFilters], { 0: { active: true, value: 'all' } });
      resultFilters.find((filter) => filter.value === 'all').active = isAll;

      state.activeFilters = resultFilters;
    },
  },
  extraReducers: {
    [fetchTickets.pending]: (state) => { state.status = 'loading'; },
    [fetchTickets.fulfilled]: (state, { payload }) => {
      state.status = 'succeeded';
      // Calculate number of transfers for appropriate filtering
      ticketsAdapter.setAll(state, payload.map((ticket) => ({
        ...ticket,
        id: nanoid(),
        transfer:
          ticket.segments[0].stops.length === ticket.segments[1].stops.length
            ? ticket.segments[0].stops.length.toString()
            : 'all',
      })));
    },
    [fetchTickets.rejected]: (state, { error }) => {
      state.status = 'failed';
      state.error = error.message;
    },
  },
});

export const { filterTickets, setSortType } = ticketsSlice.actions;

export default ticketsSlice.reducer;
