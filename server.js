'use strict';

const express = require("express");
const bodyParser = require('body-parser');
const DiscountCalculator = require("./src/discountCalculator");
const CouponDAO = require("./src/couponDao.js");

const PORT = 8080;
const HOST = '0.0.0.0';

const app = express();
app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());

app.post('/', async (req, res) => {
  const payload = req.body;
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  if (!payload.cart || !payload.discountCode) {
    const responseObj = { 'error': `Expected JSON with keys ['cart', 'discountCode']`};
    res.status(400).json(responseObj);
  } else {
    const discountCalculator = new DiscountCalculator();
    let itemFinalDiscountedAmount = 0.0;
    req.body.cart.forEach(element => {
        const itemTotal = (element.itemQty * element.itemPrice);
        itemFinalDiscountedAmount += discountCalculator.calculateFinalAmount(itemTotal);
      });
    
    try {
      const dao = new CouponDAO();
      const success = await dao.insertCoupon(payload.discountCode, ip);
      if (success) {
        const response = { "discounted_total": itemFinalDiscountedAmount };
        res.json(response);
      } else {
        const response = { "error": "Coupon code already used; please try a fresh one" };
        res.status(400).json(response);
      }
    } catch(e) {
      console.log("Unhandled server exception: " + e.stack);
      res.status(500).json({'error': 'Internal server error'});
    }
  }
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

module.exports = app;
