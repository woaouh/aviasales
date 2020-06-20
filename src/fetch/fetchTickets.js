import axios from 'axios';

const SEARCH_ID = 'https://front-test.beta.aviasales.ru/search';
const API = 'https://front-test.beta.aviasales.ru/tickets?searchId=';

// Fetch Tickets
export const fetchTickets = async () => {
  const searchIdResponse = await axios.get(SEARCH_ID);
  const response = await axios.get(
    API + encodeURIComponent(searchIdResponse.data.searchId)
  );
  const tickets = Object.keys(response.data.tickets).map(
    (ticket) => response.data.tickets[ticket]
  );
  // Set value from stops.length for appropriate filtering
  const result = tickets.map((n, i) => ({
    ...n,
    value:
      n.segments[0].stops.length === n.segments[1].stops.length
        ? n.segments[0].stops.length.toString()
        : 'all',
    id: i + 1,
  }));
  return result.sort((a, b) => a.price - b.price);
};
