## Project implementation

This project as a test task was implemented by me and reviewed by Front end community from internet. 

The project has only one page with actual flight tickets fetched from DB. Sometimes DB returns an error that we appropriately handle and notify user about it.

Every ticket has a return ticket, price, date and time of departure, origin and destination implemented as an IATA codes, number of connections implemented as an IATA codes and duration of the flight.

By default tickets are sorted by price and button "Самый дешевый" is active. You can push the button "Самый быстрый" to sort it by flight duration.

There is a filter block on the left side where user can filter tickets by number of connections. If there is no active filter we notify user appropriately.

Date processing was implemented without any packages. Date-fns was added instead of hand approach.
For pluralisation was added Plural-RU package instead of hand approach.
Added Classnames package for joining class names together instead of hand approach.

UPD: Recoded the project with Redux. Removed axios.

Link to the test-task: https://github.com/KosyanMedia/test-tasks/tree/master/aviasales_frontend

Implemented Project: https://reverent-mayer-a8d472.netlify.app
