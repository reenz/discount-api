// The coupon database access object

const {Client} = require('pg');

class CouponDAO {

  constructor(connectionString=null) {
    this.connectionString = connectionString || process.env.DATABASE_URL;
    console.log(`The connection string passed is ${this.connectionString}`);
  }

  async _connect() {
    const client = new Client({
      connectionString: this.connectionString
    });
    await client.connect();
    return client;
  }

  async insertCoupon(coupon, ip) {
    const client = await this._connect();
    const details = [ coupon, new Date(), ip ];
    try {
      const res = await client.query('INSERT INTO coupon_details values($1, $2, $3)', details);
      console.log('Rows inserted by postgres %s', res.rowCount);
      return true; 
    } catch(e) {
      console.warn('Error when inserting row: %s', e.detail);
      return false;
    } finally {
      await client.end();
    }
  }

  async createTable() {
    const cmd = `create table coupon_details(coupon text primary key, redeemed_on timestamp with time zone, ip text);`
    const client = await this._connect();
    try {
      await client.query(cmd);
    } catch (e) {
      console.error('Failed to create table %o', e);
    } finally {
      client.end();
    }
  }

}

module.exports = CouponDAO;