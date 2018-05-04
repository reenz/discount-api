const chai = require("chai");

const should = chai.should();

const DiscountCalculator = require("../src/discountCalculator");
const discountCalculator  = new DiscountCalculator();

describe("DiscountCalculator",() => {
  it("should calculate VAT",() => {
    discountCalculator.calculateVat(100).should.be.equal(20);
  })

  it("should calculate total for discount",() => {
    discountCalculator.calculateTotalForDiscount(100).should.be.equal(80);
  })

  it("should calculate discount after deducting VAT",() => {
    discountCalculator.calculateDiscount(100).should.be.equal(32);
  }) 
})