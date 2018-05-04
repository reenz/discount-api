const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
chai.use(chaiHttp);
const server = require("../server")

describe("Index page", () => {
  it("should respond with status 200", (done) => {
    chai
      .request(server)
      .post("/")
      .end((err, res) => {
        should
          .not
          .exist(err);
        res
          .status
          .should
          .equal(200);
        done();
      });
  });
});