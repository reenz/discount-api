'use strict';

const express = require("express");
const bodyParser = require('body-parser');
const DiscountCalculator = require("./src/discountCalculator");
const discountCalculator = new DiscountCalculator();

const PORT = 8080;
const HOST = '0.0.0.0';

const app = express();
app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());

app.post('/', (req, res) => {
  let payload = req.body;

  if (!payload.cart || !payload.discountCode) {
    const responseObj = { 'error': `Expected JSON with keys ['cart', 'discountCode']`};
    res.status(400).json(responseObj);
  } else {
    let itemFinalDiscountedAmount = 0.0;
    req.body.cart.forEach(element => {
        const itemTotal = (element.itemQty * element.itemPrice);
        itemFinalDiscountedAmount += discountCalculator.calculateFinalAmount(itemTotal);
      });
    const response = {
      "discounted_total": itemFinalDiscountedAmount
    };
    res.json(response);
  }
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

module.exports = app;
