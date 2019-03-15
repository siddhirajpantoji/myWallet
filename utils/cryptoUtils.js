const crypto = require("crypto");

function hashPassword (password ){
    const hash = crypto.createHash('sha256');
    hash.update(password);
    return hash.digest('hex');
}
// console.log(hashPassword("Password"))
// console.log(hashPassword("Password"))
// console.log(hashPassword("Password1"))
module.exports = {hashPassword}