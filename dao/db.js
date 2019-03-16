const { Pool, Client } = require('pg')
console.log("Host "+process.env.DB_HOST);
console.log("user "+process.env.DB_USER);
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
})
console.log(process.env.DB_USER);
  
module.exports = {
    query: function(text, values, cb) {
        pool.query(text,values, (err, res) => {
            pool.end();
            cb(err,res);
          })
    }
 }