# Bilbokningen - Final assignment of Advanced Webapplication Development 1

### School: Lernia Stockholm, Sweden.

### Program: JavaScript Developer - Front End, YHJUST16.

### Course: Advanced Web Application Development 1.

#### Technologies

See package.json dependencies and dev-dependencies

#### Description

The purpose of this assignment was to prove that I grasp the communication between the frontend and backend by developing and testing a small application using ExpressJS.

First I used Express to setup a simple server. I then created models and routes which would be used to store data in the database via MongoDB and Mongoose. After that I created some views using PugJS and lastly created tests for the API endpoints I had time to write tests for.

It was supposed to be a group assignment but due to certain circumstances I ended up doing it myself, hence the lack of time to make tests for everything and make a decent frontend.

#### Instructions

Clone down the repo to your folder of choice and run `npm install`

You'll also need a `.env` file to connect to the database, which I will upload after my repo has been graded.

Use the API Reference down below to navigate through the endpoints.

You can run the tests by simply typing `mocha` or `npm test` in the command propmt if you are in the working directory. **HOWEVER YOU NEED TO REMOVE** `isLoggedIn` **FUNCTION FROM THE ROUTES THAT HAS IT IN CARS.JS AND RESERVATIONS.JS BEFORE YOU RUN THE TEST COMMAND, IN ORDER TO MAKE THE TESTS PASS.** I've simply not had enough time to find a way to work around this.
### API Reference

#### Users

---

| GET Requests                           | Requires login? |
| -------------------------------------- |:---------------:|
| localhost:4000/                        | No              |
| localhost:4000/users/register          | No              |
| localhost:4000/users/all               | Yes             |
| localhost:4000/users/logout            | Yes             |

| POST Requests                          | Requires login? |
| -------------------------------------- |:---------------:|
| localhost:4000/users/login             | Yes             |
| localhost:4000/users/register          | No              |

#### Cars

---

| GET Requests                           | Requires login? |
| -------------------------------------- |:---------------:|
| localhost:4000/cars/                   | No              |
| localhost:4000/cars/available          | No              |
| localhost:4000/cars/familycars         | No              |
| localhost:4000/cars/sportscars         | No              |
| localhost:4000/cars/bmw                | No              |
| localhost:4000/cars/volvo              | No              |
| localhost:4000/cars/audi               | No              |
| localhost:4000/cars/ford               | No              |
| localhost:4000/cars/mercedes           | No              |
| localhost:4000/cars/renault            | No              |
| localhost:4000/cars/mitsubishi         | No              |
| localhost:4000/cars/tesla              | No              |
| localhost:4000/cars/volkswagen         | No              |
| localhost:4000/cars/addcar             | No              |

| POST Requests                          | Requires login? |
| -------------------------------------- |:---------------:|
| localhost:4000/cars/addcar             | Yes             |

| PATCH Requests                         | Requires login? |
| -------------------------------------- |:---------------:|
| localhost:4000/cars/updatecar/:id      | Yes             |

| DELETE Requests                        | Requires login? |
| -------------------------------------- |:---------------:|
| localhost:4000/cars/removecar/:id      | Yes             |

#### Reservations

---

| GET Requests                           | Requires login? |
| -------------------------------------- |:---------------:|
| localhost:4000/reservations/           | Yes             |
| localhost:4000/reservations/rentcar    | No              |

| POST Requests                          | Requires login? |
| -------------------------------------- |:---------------:|
| localhost:4000/reservations/rentcar    | Yes             |

| DELETE Requests                        | Requires login? |
| -------------------------------------- |:---------------:|
| localhost:4000/reservations/cancel/:id | Yes             |


#### Potential future improvements

See TODO.md