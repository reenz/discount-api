const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
chai.use(chaiHttp);
const server = require("../server")
const uuidv1 = require("uuid/v1");

describe("Discount API", () => {
  it("should respond with status 400 if no cart provided", async() => {
    const res = await chai
      .request(server)
      .post("/")
    res
      .status
      .should
      .equal(400);
  });

  it("should respond with status 200 when cart provided", async() => {
    const discountCode = uuidv1();
    const res = await chai
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
    res
      .status
      .should
      .equal(200);
  });

  it("should respond with final discounted price", async() => {
    const discountCode = uuidv1();
    const res = await chai
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

    res
      .text
      .should
      .equal(JSON.stringify({"discounted_total": 5.76}));

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