const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
chai.use(chaiHttp);
const server = require("../server")

describe("Discount API", () => {
  it("should respond with status 400 if no cart provided", (done) => {
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
          .equal(400);
        done();
      });
  });

  it("should respond with status 200 when cart provided", (done) => {
    chai
      .request(server)
      .post("/")
      .send({"cart":[{"itemId": 1, "itemQty": 2, "itemPrice": 5}], "discountCode":"7ch83829oup"})
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


  it("should respond with final discounted price", (done) => {
    chai
      .request(server)
      .post("/")
      .send({"cart":[{"itemId": 1, "itemQty": 2, "itemPrice": 5}], "discountCode":"7ch83829oup"})
      .end((err, res) => {
        res
          .text
          .should
          .equal(JSON.stringify({"discounted_total":5.76}));
        done();
      });
  });
});