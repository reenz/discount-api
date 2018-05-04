class DiscountCalculator {

  constructor(couponDiscountPercent = 40, vatPercent = 20) {
    this.couponDiscount = couponDiscountPercent / 100.0;
    this.vat = vatPercent / 100.0;
  }

  calculateVat(total) {
    return total * this.vat;
  }

  calculateTotalForDiscount(total) {
    const vatValue = this.calculateVat(total);
    return total - vatValue;
  }
}

module.exports = DiscountCalculator;