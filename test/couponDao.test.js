const chai = require("chai");
const sinon = require("sinon");

const should = chai.should();

const CouponDAO = require("../src/couponDao");

describe("CouponDAO", () => {
  const dao = new CouponDAO();

  afterEach(() => {
    sinon.restore();
  });

  it("should correctly fire insert coupon query ", async() => {
    const coupon = 'coupon';
    const ip = '127.0.0.1';
    const querySpy = sinon.spy();
    const endSpy = sinon.spy();
    sinon
      .stub(dao, '_connect')
      .resolves({'query': querySpy, 'end': endSpy});
    await dao.insertCoupon(coupon, ip);
    const spyQueryArgs = querySpy.args[0][1];
    spyQueryArgs[0]
      .should
      .equal(coupon);
    spyQueryArgs[2]
      .should
      .equal(ip);
    endSpy
      .calledOnce
      .should
      .equal(true);
  });

  it("should correctly fire create table query", async() => {
    const cmd = `create table coupon_details(coupon text primary key, redeemed_on timestamp with time zone, ip text);`
    const querySpy = sinon.spy();
    const endSpy = sinon.spy();
    sinon
      .stub(dao, '_connect')
      .resolves({'query': querySpy, 'end': endSpy});
    await dao.createTable();
    querySpy
      .calledOnceWith(cmd)
      .should
      .equal(true);
    endSpy
      .calledOnce
      .should
      .equal(true);
  });

});