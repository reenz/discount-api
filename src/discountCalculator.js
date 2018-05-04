class DiscountCalculator {

  constructor(couponDiscountPercent=40, vatPercent=20) {
    this.couponDiscount = couponDiscountPercent / 100.0;
    this.vat = vatPercent / 100.0;
  }

  calculateVat(total) {
    return total * this.vat ;
  }
}

module.exports = DiscountCalculator;