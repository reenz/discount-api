// The coupon database access object

const {Client} = require('pg');

class CouponDAO {

  async insertCoupon(coupon, ip) {
    const client = new Client();
    await client.connect();
    const details = [ coupon, new Date(), ip ];
    try {
      const res = await client.query('INSERT INTO coupon_details values($1, $2, $3)', details);
      return true; 
    } catch(e) {
      return false;
    } finally {
      await client.end();
    }
  }

}

module.exports = CouponDAO;