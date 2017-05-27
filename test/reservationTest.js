const app = require("../server.js");
const mongodb = require("mongodb");
const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();

chai.use(chaiHttp);

let sampleUser = {
  email: "supermail@gmail.com",
  firstName: "Test dude",
  lastName: "McTest",
  phoneNumber: 123456789,
  _id: new mongodb.ObjectID
};

let sampleCar = {
  brand: "Tesla",
  automatic: true,
  seats: 2,
  roofRack: false,
  towbar: false,
  _id: new mongodb.ObjectID
};

//REMEMBER TO REMOVE "isLoggedIn" FROM ROUTES BEFORE RUNNING TESTING, AS I HAVE YET TO FIGURE OUT A WAY TO BYPASS THAT/SIMULATE A OFFLINE LOGIN

describe("Reservation Tests", () => {

  //This test should get all reservations in database
  it("Should GET all reservations in database", (done) => {
    chai.request(app)
      .get("/reservations/")
      .end((err, res) => {
        res.should.have.status(200);
        res.should.have.header("content-type", "application/json; charset=utf-8");
        done(err);
      });
  });

  //This test POSTs a reservations to the database
  it("Should POST a reservation to database", (done) => {
    chai.request(app)
      .post("/reservations/rentcar")
      .send(
      {
        carID: "5929419d1b8a6b2744d8b7ef",
        userID: "592584f7efa2c119fce1de28",
        dateFrom: "2017-5-27",
        dateTo: "2017-5-30",
        roofRack: false,
        towBar: false
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.should.have.header("content-type", "application/json; charset=utf-8");
        done(err);
      });
  });

});