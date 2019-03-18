const db = require('./db');
const queries = require('./daoQueries').QUERIES
//console.log(process.env);
function login(userLoginReq) {
    var username = userLoginReq.username;
    var password = userLoginReq.password;
    return new Promise((resolve, reject) => {
        db.query(queries.USER.LOGIN_USER, [username, password], function (err, data) {
            if (err) {
                reject(err)
            }
            else {
                resolve(data.rows[0])
            }
        })
    })
}

function createUser(userCreateReq) {
    return new Promise((resolve, reject) => {
        console.log(userCreateReq)
        db.query(queries.USER.CREATE_USER_RECORD, [userCreateReq.username, userCreateReq.password, userCreateReq.first_name, userCreateReq.last_name],
            function (err, data) {
                if (err) {
                    reject(err)
                }
                else {
                    console.log()
                    resolve(data.rows[0]);
                }
            })
    })
}

function updateTokenAndLogin(updateReq) {
    return new Promise((resolve, reject) => {
        console.log(updateReq)
        db.query(queries.USER.UPDATE_TOKEN_LAST_LOGIN, [updateReq.token, updateReq.user_id],
            function (err, data) {
                console.log("Inside Wallet ")

                if (err) {
                    console.error(JSON.stringify(err)); 
                    reject(err)
                }
                else {
                    console.log()
                    resolve(data);
                }
            })
    })
}
function updatePassword(passwordUpdateReq) {
    return new Promise((resolve, reject) => {
        db.query(queries.USER.CREATE_USER_RECORD, [userCreateReq.username, userCreateReq.password, userCreateReq.token, userCreateReq.last_login, userCreateReq.first_name, userCreateReq.last_name],
            function (err, data) {
                if (err) {
                    reject(err)
                }
                else {
                    console.log()
                    resolve(data);
                }
            })
    })
}

function updateUser(userUpdateReq, callback) {

}

function createUserTable() {
    return new Promise((resolve, reject) => {
        db.query(queries.USER.CREATE_USER_TABLE, undefined, function (err, data) {
             if (err) {     
                    reject(err)
                }
                else {
                    console.log()
                    resolve(data.rows[0]);
                }
        })
    })
}
function checkIfUserExists(userName) {
    // console.log("userName "+userName)
    return new Promise((resolve, reject) => {
        db.query(queries.USER.CHECK_IF_USER_EXISTS, [userName], function (err, data) {
            //       console.log(data)
            //     console.log(" user Exists condition ")
            if (err) {
                reject(err)
            }
            else {
                console.log()
                resolve(data);
            }
        })
    })
}


module.exports = {
    createUserTable, login, updatePassword, updateUser, createUser, updateTokenAndLogin, checkIfUserExists
}