-- postgresql://dbuser:secretpassword@database.server.com:3211/mydb
create table coupon_details(coupon text primary key, redeemed_on timestamp with time zone, ip text);