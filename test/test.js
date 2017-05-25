const app = require("../server.js");
const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();

chai.use(chaiHttp);

describe("Cars.js", () => {

  
  it("Should get cars", (done) => {
    chai.request(app)
      .get("/cars")
      .end((err, res) => {
        console.log(res);
        res.should.have.status(200);
        res.should.have.header("content-type", "application/json; charset=utf-8");
        done(err);
      });
  });
});
