// The coupon database access object

const {Client} = require('pg');

class CouponDAO {

  constructor(connectionString=null) {
    this.connectionString = connectionString || process.env.DATABASE_URL;
    console.log(`The connection string passed is ${this.connectionString}`);
  }

  async insertCoupon(coupon, ip) {
    const client = new Client({
      connectionString: this.connectionString
    });
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