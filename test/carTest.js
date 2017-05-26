const app = require("../server.js");
const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();

chai.use(chaiHttp);

const sampleCar = {
  brand: "Audi",
  automatic: true,
  seats: 2,
  roofRack: false,
  towbar: false,
  pricePerDay: 2000,
  available: true
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

describe("Car Tests", () => {

  
  it("Should get cars", (done) => {
    chai.request(app)
      .get("/cars")
      .end((err, res) => {
        res.should.have.status(200);
        res.should.have.header("content-type", "application/json; charset=utf-8");
        done(err);
      });
  });

//Requires you to be logged in to test properly, will look into how to work around it later
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

  //This test sends sampleCar2 which is missing the property available, which should fail the car POST to database
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

});
