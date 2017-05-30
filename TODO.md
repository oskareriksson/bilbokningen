* Create a function that calculates the amount of days between two dates in /rentcar route so that you can calculate the total price of renting the car

* Create a basic frontend for delete/patch requests

* Create a delete route for users.js - Haven't done this yet because I need to add some admin property or something to the User model so that not just anyone can remove users. The admin property would come in handy for other things not just anyone should be able to do, like adding cars, but I simply don't have enough time for that right now.

* Create error handling for unauthorized route access (i.e no login)/other errors

* Create views for 404's/other error messages

* Look into how to make the tests work even with "isLoggedIn" function on the routes - Can probably make it work using an agent like I've done in userTest.js, but I don't have enough time to fix that right now

* Create some sort of constraint in reservations that prevents you from adding a roof rack or a tow bar to a car that doesn't have it available.

* Fix a bug with reservations/rentcar that won't let you rent a car to a future date, you can apparently only choose dateTo up until the current date.