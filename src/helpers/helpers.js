import { add } from 'date-fns';

// Calc Arrival time through adding minutes of flight duration to the Departure Date
export const getArrivalDate = (date, duration) => add(new Date(date), { minutes: duration });

// Convert date to 00:00 time format
export const convertDateToTime = (date) => {
  const dateTimeFormat = new Intl.DateTimeFormat('en', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
  const [{ value: hour }, , { value: minute }] = dateTimeFormat.formatToParts(date);
  return `${hour}:${minute}`;
};

// Convert minutes of flight duration to 00ч 00м time format
export const convertMinsToTime = (mins) => {
  let h = Math.floor(mins / 60);
  let m = mins % 60;
  h = h < 10 ? `0${h}` : h;
  m = m < 10 ? `0${m}` : m;
  return `${Math.floor(h)}ч ${Math.floor(m)}м`;
};
