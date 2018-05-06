const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
chai.use(chaiHttp);
const server = require("../server")
const uuidv1 = require("uuid/v1");

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
    const discountCode = uuidv1();
    chai
      .request(server)
      .post("/")
      .send({
        "cart": [
          {
            "itemId": 1,
            "itemQty": 2,
            "itemPrice": 5
          }
        ],
        "discountCode": discountCode
      })
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
    const discountCode = uuidv1();
    chai
      .request(server)
      .post("/")
      .send({
        "cart": [
          {
            "itemId": 1,
            "itemQty": 2,
            "itemPrice": 5
          }
        ],
        "discountCode": discountCode
      })
      .end((err, res) => {
        res
          .text
          .should
          .equal(JSON.stringify({"discounted_total": 5.76}));
        done();
      });
  });

  it("should raise an error if same discount code is used", async() => {
    const discountCode = uuidv1();
    await chai
      .request(server)
      .post("/")
      .send({
        "cart": [
          {
            "itemId": 1,
            "itemQty": 2,
            "itemPrice": 5
          }
        ],
        "discountCode": discountCode
      });

    const res = await chai
      .request(server)
      .post("/")
      .send({
        "cart": [
          {
            "itemId": 1,
            "itemQty": 2,
            "itemPrice": 15
          }
        ],
        "discountCode": discountCode
      })

    res
      .text
      .should
      .equal(JSON.stringify({"error": "Coupon code already used; please try a fresh one"}));
  });
});