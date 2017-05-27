const app = require("../server.js");
const mongodb = require("mongodb");
const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();

chai.use(chaiHttp);

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
});