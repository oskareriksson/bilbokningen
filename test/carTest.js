const app = require("../server.js");
const mongodb = require("mongodb");
const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();

chai.use(require("chai-things"));
chai.use(chaiHttp);

let sampleCar = {
  brand: "Audi",
  automatic: true,
  seats: 2,
  roofRack: false,
  towbar: false,
  pricePerDay: 2000,
  available: true,
  _id: new mongodb.ObjectID //Custom ID for testing the "/removecar/:id" route
};

//This sample car is missing property available
const sampleCar2 = {
  brand: "Audi",
  automatic: true,
  seats: 2,
  roofRack: false,
  towbar: false,
  pricePerDay: 2000,
};

const patchedCar = {
  brand: "Mercedes",
  automatic: false,
  seats: 2,
  roofRack: false,
  towbar: true,
  pricePerDay: 1500,
  available: true
};

//REMEMBER TO REMOVE "isLoggedIn" FROM ROUTES BEFORE RUNNING TESTING, AS I HAVE YET TO FIGURE OUT A WAY TO BYPASS THAT/SIMULATE A OFFLINE LOGIN

describe("Car Tests", () => {

  //This test GET all the cars in the database
  it("Should get cars", (done) => {
    chai.request(app)
      .get("/cars")
      .end((err, res) => {
        res.should.have.status(200);
        res.should.have.header("content-type", "application/json; charset=utf-8");
        done(err);
      });
  });

  //This test GET all the cars where the available property === true
  it("Should get cars with the property available: true", (done) => {
    chai.request(app)
      .get("/cars/available")
      .end((err, res) => {
        res.should.have.status(200);
        res.should.have.header("content-type", "application/json; charset=utf-8");
        for(let i = 0; i < res.body.length; i++){
          res.body[i].should.have.property("available").eql(true);
        }
        done(err);
      });
  });

//Test below this line equires you to be logged in to test properly, will look into how to work around it later.

//This test POST a car to the database
  it("Should post a car", (done) => {
    chai.request(app)
      .post("/cars/addcar")
      .send(sampleCar)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.have.header("content-type", "application/json; charset=utf-8");
        res.body.should.have.property("brand");
        res.body.should.have.property("automatic");
        res.body.should.have.property("seats");
        res.body.should.have.property("roofRack");
        res.body.should.have.property("towbar");
        res.body.should.have.property("pricePerDay");
        res.body.should.have.property("available");
        done(err);
      });
  });

  //This test attempts to POST sampleCar2 which is missing the property available, which fails the car POST to database
  it("Should fail to post a car", (done) => {
    chai.request(app)
      .post("/cars/addcar")
      .send(sampleCar2)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.have.header("content-type", "application/json; charset=utf-8");
        res.body.should.have.property("errors");
        done(err);
      });
  });

  //This test PATCH the car that we previously POSTed with new information
  it("Should update the car that we previously posted", (done) => {
    chai.request(app)
      .patch(`/cars/updatecar/${sampleCar._id}`)
      .send(patchedCar)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.have.header("content-type", "application/json; charset=utf-8");
        res.body.should.have.property("brand");
        res.body.should.have.property("automatic");
        res.body.should.have.property("seats");
        res.body.should.have.property("roofRack");
        res.body.should.have.property("towbar");
        res.body.should.have.property("pricePerDay");
        res.body.should.have.property("available");
        done(err);
      });
  });

  //This test sends only one property of the "patchedCar", which will fail because the Car model and "updatecar" route requires all properties to exist in order to update the car
  it("Should fail to update the car that we previously posted", (done) => {
    chai.request(app)
      .patch(`/cars/updatecar/${sampleCar._id}`)
      .send(patchedCar.automatic)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.have.header("content-type", "application/json; charset=utf-8");
        res.body.should.have.property("name").eql("CastError");
        done(err);
      });
  });

  //This deletes the car that we previously added through a POST request using its ObjectID
  it("Should remove the car we previously posted", (done) => {
    chai.request(app)
      .delete(`/cars/removecar/${sampleCar._id}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.have.header("content-type", "text/html; charset=utf-8");
        res.should.have.property("text").eql("Car successfully removed from database!");
        done(err);
      });
  });
});
