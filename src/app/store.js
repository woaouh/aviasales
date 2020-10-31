import { configureStore } from '@reduxjs/toolkit';
import ticketsReducer from '../features/tickets/ticketsSlice';

export default configureStore({
  reducer: {
    tickets: ticketsReducer,
  },
});
