## Project implementation

This project as a test task was implemented by me and reviewed by Front end community from internet. 

The project has only one page with actual flight tickets fetched from DB. Sometimes DB returns an error that we appropriately handle and notify user about it.

Every ticket has a return ticket, price, origin and destination implemented as an IATA codes, date and time of departure, number of connections implemented as an IATA codes and duration of the flight.

By default tickets are sorted by price and button "Самый дешевый" is active. You can push the button "Самый быстрый" to sort it by flight duration.

There is a filter block on the left side where user can filter tickets by number of connections. If there is no active filter we notify user appropriately.

In the commits history you can see how the project was implemented before and after review.
Date processing was implemented without any packages. After review one package with name date-fns was added with purpose to reach appropriate work with dates like if it is a real project.

For pluralisation was added Plural-RU package instead of hand approach.

Added Classnames package for joining class names together instead of hand approach.

https://fervent-ardinghelli-25202b.netlify.app