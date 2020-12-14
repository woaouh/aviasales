/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  tickets: [],
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
};

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
    // Calculate number of transfers for appropriate filtering
    const result = response.map((n) => ({
      ...n,
      id: nanoid(),
      transfer:
        n.segments[0].stops.length === n.segments[1].stops.length
          ? n.segments[0].stops.length.toString()
          : 'all',
    }));
    return result;
  },
);

export const ticketsSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    sortedByFastest(state) {
      state.sort = 'duration';
    },
    sortedByCheapest(state) {
      state.sort = 'price';
    },
    filteredTickets(state, action) {
      state.activeFilters = action.payload;
    },
  },
  extraReducers: {
    [fetchTickets.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchTickets.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      // Add any fetched tickets to the array
      state.tickets = state.tickets.concat(action.payload);
    },
    [fetchTickets.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
  },
});

export const {
  sortedByFastest,
  sortedByCheapest,
  filteredTickets,
} = ticketsSlice.actions;

export default ticketsSlice.reducer;
