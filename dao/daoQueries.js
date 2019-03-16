const QUERIES = {
    USER :{
        LOGIN_USER :" SELECT * FROM wallet_user where username=$1 and password =$2 ",
        UPDATE_TOKEN_LAST_LOGIN : "UPDATE wallet_user SET last_login = NOW() , token = $1 where user_id = $2 returning * ",
        CREATE_USER_RECORD : " INSERT INTO wallet_user (username, password , token , last_login, first_name , last_name) values ($1,$2,$3,$4,$5,$6) returning *",
        UPDATE_USER_PASSWORD: " UPDATE wallet_user set password = $1 , token = null where username = $2 returning * ",
        UPDATE_USER_INFO:" UPDATE wallet_user set first_name = $1 , last_name = $2 where username = $3 returning * ",
        DROP_USER_TABLE:" DROP TABLE wallet_user if exists ",
        CREATE_USER_TABLE :" CREATE TABLE IF NOT EXISTS  wallet_user (user_id SERIAL, username varchar not null unique , password varchar not null, token varchar , first_name varchar , lastname varchar )"    
    }
}
module.exports = { QUERIES }