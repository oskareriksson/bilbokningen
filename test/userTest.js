const app = require("../server.js");
const mongodb = require("mongodb");
const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
let agent = chai.request.agent(app);

chai.use(chaiHttp);

const sampleUser = {
  username: "TestUser",
  password: "pw123",
  email: "supermail@gmail.com",
  firstName: "Test dude",
  lastName: "McTest",
  phoneNumber: 123456789,
  _id: new mongodb.ObjectID
};

describe("User Tests", () => {

  //This test registers a user to the database
  it("Should register a new user", (done) => {
    chai.request(app)
      .post("/users/register")
      .send(sampleUser)
      .end((err, res) => {
        console.log(res.text);
        res.should.have.status(200);
        res.should.have.header("content-type", "text/html; charset=utf-8");
        res.should.have.property("text").eql("User successfully added!");
        done(err);
      });
  });

  //This test logs in the user that we just registered
  it("Should login the user", (done) => {
    agent
      .post("/users/login")
      .send({ username: sampleUser.username, password: sampleUser.password })
      .end((err, res) => {
        res.should.have.status(200);
        res.should.have.header("content-type", "text/html; charset=utf-8");
        done(err);
      });
  });

  //This test should GET all registered users
  it("Should GET all users from database", (done) => {
    agent
      .get("/users/all")
      .end((err, res) => {
        res.should.have.status(200);
        res.should.have.header("content-type", "application/json; charset=utf-8");
        for(let i = 0; i < res.body.length; i++) {
          res.body[i].should.have.property("email");
          res.body[i].should.have.property("firstName");
          res.body[i].should.have.property("lastName");
          res.body[i].should.have.property("phoneNumber");
        }
        done(err);
      });
  });

});