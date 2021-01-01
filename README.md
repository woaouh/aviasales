[![Maintainability](https://api.codeclimate.com/v1/badges/467a8656400706c3db22/maintainability)](https://codeclimate.com/github/woaouh/aviasales/maintainability) [![Lint and Test](https://github.com/woaouh/aviasales/workflows/lint-and-test/badge.svg)](https://github.com/woaouh/aviasales/actions)

# Test task for Front end developer from Aviasales

*To run the project locally:*
```
$ make install
$ make start
```

## Project implementation

This project as a test task has been implemented by me and reviewed by Front end community from the internet.

The project has only one page with actual flight tickets fetched from DB. Sometimes DB returns an error that we appropriately handle and notify user about it.

Every ticket has a return ticket, price, date and time of departure, origin and destination implemented as an IATA codes, number of connections implemented as an IATA codes and duration of the flight.

By default tickets are sorted by price and the button "Самый дешевый" is active. The button "Самый быстрый" can be pushed to sort it by flight duration.

There is a filter block on the left side where tickets can be filtered by number of connections. If there is no active filter we notify user appropriately.

## Links

* [Test task](https://github.com/KosyanMedia/test-tasks/tree/master/aviasales_frontend)
* [Live project](https://reverent-mayer-a8d472.netlify.app)
