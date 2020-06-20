import { add } from 'date-fns';

export function getDepartureDate(date) {
  return new Date(date);
}

// Calc Arrival time through adding minutes of flight duration to the Departure Date
export function getArrivalDate(date, duration) {
  return add(new Date(date), {
    minutes: duration,
  });
}

// Convert date to 00:00 time format
export function convertDateToTime(date) {
  const dateTimeFormat = new Intl.DateTimeFormat('en', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
  const [{ value: hour }, , { value: minute }] = dateTimeFormat.formatToParts(
    date
  );
  return `${hour}:${minute}`;
}

// Convert minutes of flight duration to 00ч 00м time format
export function convertMinsToTime(mins) {
  let h = Math.floor(mins / 60);
  let m = mins % 60;
  h = h < 10 ? '0' + h : h;
  m = m < 10 ? '0' + m : m;
  return `${h}ч ${m}м`;
}
