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

  calculateDiscount(total) {
    const totalLessVat = this.calculateTotalForDiscount(total);
    return totalLessVat * this.couponDiscount;
  }

  calculateFinalAmount(total) {
    const totalLessVat = this.calculateTotalForDiscount(total);
    const discountValue = this.calculateDiscount(total);
    const totalWithDiscount = totalLessVat - discountValue;
    const vatValue = this.calculateVat(totalWithDiscount);
    return totalWithDiscount + vatValue;
  }
}

module.exports = DiscountCalculator;