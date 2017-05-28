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
  phoneNumber: 123456789
};

let sampleCar = {
  brand: "Tesla",
  automatic: true,
  seats: 2,
  roofRack: false,
  towbar: false
};

let sampleReservation = {
  carID: "59294af6bd6a2c4530e5286d",
  userID: "592a98d105f9be14a465d39a",
  dateFrom: "2017-05-28",
  dateTo: "2017-05-30",
  roofRack: false,
  towBar: false,
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
        for(let i = 0; i < res.body.length; i++) {
          //res.body
          res.body[i].should.have.property("pricePerDay");
          res.body[i].should.have.property("carID");
          res.body[i].should.have.property("userID");
          res.body[i].should.have.property("dateFrom");
          res.body[i].should.have.property("dateTo");
          res.body[i].should.have.property("roofRack");
          res.body[i].should.have.property("towBar");
          //rentedBy
          res.body[i].rentedBy.should.have.property("email");
          res.body[i].rentedBy.should.have.property("firstName");
          res.body[i].rentedBy.should.have.property("lastName");
          res.body[i].rentedBy.should.have.property("phoneNumber");
          //car
          res.body[i].car.should.have.property("towbar");
          res.body[i].car.should.have.property("roofRack");
          res.body[i].car.should.have.property("seats");
          res.body[i].car.should.have.property("automatic");
          res.body[i].car.should.have.property("brand");
        }
        done(err);
      });
  });

  /*//This test POSTs a reservations to the database
  it("Should POST a reservation to database", (done) => {
    chai.request(app)
      .post("/reservations/rentcar")
      .send(
      {
        carID: "5929419d1b8a6b2744d8b7ef",
        userID: "592584f7efa2c119fce1de28",
        dateFrom: "2017-05-27",
        dateTo: "2017-05-30",
        roofRack: false,
        towBar: false
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.should.have.header("content-type", "application/json; charset=utf-8");
        //rentedBy
        res.body.rentedBy.should.have.property("email");
        res.body.rentedBy.should.have.property("firstName");
        res.body.rentedBy.should.have.property("lastName");
        res.body.rentedBy.should.have.property("phoneNumber");
        //car
        res.body.car.should.have.property("towbar");
        res.body.car.should.have.property("roofRack");
        res.body.car.should.have.property("seats");
        res.body.car.should.have.property("automatic");
        res.body.car.should.have.property("brand");
        done(err);
      });
  });*/

  it("Should POST a sample reservation to database", (done) => {
    chai.request(app)
    .post("/reservations/rentcar")
    .send(sampleReservation)
    .end((err, res) => {
      res.should.have.status(200);
      res.should.have.header("content-type", "application/json; charset=utf-8");
      //res.body
      res.body.should.have.property("pricePerDay");
      res.body.should.have.property("carID");
      res.body.should.have.property("userID");
      res.body.should.have.property("dateFrom");
      res.body.should.have.property("dateTo");
      res.body.should.have.property("roofRack");
      res.body.should.have.property("towBar");
      //rentedBy
      res.body.rentedBy.should.have.property("email");
      res.body.rentedBy.should.have.property("firstName");
      res.body.rentedBy.should.have.property("lastName");
      res.body.rentedBy.should.have.property("phoneNumber");
      //car
      res.body.car.should.have.property("towbar");
      res.body.car.should.have.property("roofRack");
      res.body.car.should.have.property("seats");
      res.body.car.should.have.property("automatic");
      res.body.car.should.have.property("brand");
      done(err);
    });
  });

  //This test DELETES the car we previously POSTed
  it("Should DELETE the sample reservation that we previously POSTed", (done) => {
    chai.request(app)
      .delete(`/reservations/cancel/${sampleReservation._id}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.have.header("content-type", "text/html; charset=utf-8");
        res.should.have.property("text").eql("Reservation successfully removed!");
        done(err);
      });
  });

});