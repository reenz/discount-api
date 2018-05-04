# Discount Me That

### Challenge

One of the budding wholesale retailers in Capitalville, Mr. Rich Fairsell, has been looking at
ways of boosting the sale numbers for his new online grocery store, Sabzi For Good (SFG). SFG's
inventory has around 1MM products with prices mentioned inclusive of 20% VAT.
He decided to run a marketing campaign sending out limited time unique discount codes to all
~50MM citizens of Capitalville. The customers will be able to put in the discount code on the
checkout page and get 40% off.

### Requirements

Mr. Rich Fairsell needs your help in building an API which accepts the shopping cart with order items,
coupon code and return the final discounted value to be displayed.

* Each discount code can be used only once
* All order items are discountable
* VAT cannot be discounted

### Approach

First to understand the challenge I drew a diagram of the requirements, then solved below example request to get clear picture of the problem.
```
cart                  = [{"itemId": 1, "itemQty": 2, "itemPrice": 5}, {"itemId": 2, "itemQty": 4, "itemPrice": 2.5}]

cartTotal             =  (2 * 5 ) + (4 * 2.5)
                      =  20 (this price is inclusive of 20% VAT)

totalValidForDiscount = cartTotal - (20% VAT on cartTotal)
                      = 20 - 4
                      = 16

couponDiscount        = 40%

discountedValue       = totalValidForDiscount - (couponDiscount on totalValidForDiscount)
                      = 16 -(16 * 0.40)
                      = 9.60

finalDiscountedValue  = discountedValue + 20% VAT on discountedValue
                      = 9.60 + 1.92
                      = 11.52

```

Once I was clear how to go about it I made a sample http request
```
request:
curl -X POST -d '{"cart":[{"itemId": 1, "itemQty": 2, "itemPrice": 5}, {"itemId": 2, "itemQty": 4, "itemPrice": 2.5}], "discountCode":"7ch83829oup"}' -H "Content-Type: application/json" http://localhost:8080

response:
{"finalDiscountedValue": 11.52 }

```
To calculate the discount I have decided to make DiscountCalculator class as I don't want to have business logic in my router.

Handle invalid request and respond with helpful error message.

Use PostgreSQL to store discount code so that it cannot be used again.

I made separate class for database interaction.

### How to use 

* `git clone 