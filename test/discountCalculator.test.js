const chai = require("chai");

const should = chai.should();

const DiscountCalculator = require("../src/discountCalculator");
const discountCalculator  = new DiscountCalculator();

describe("DiscountCalculator",() => {
  it("should calculate VAT",() => {
    discountCalculator.calculateVat(100).should.be.equal(20);
  })
})