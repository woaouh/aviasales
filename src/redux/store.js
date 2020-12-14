import { configureStore } from '@reduxjs/toolkit';
import ticketsReducer from './ticketsSlice';

export default configureStore({
  reducer: {
    tickets: ticketsReducer,
  },
});
