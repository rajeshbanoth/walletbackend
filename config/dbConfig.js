const mysql= require('mysql2/promise')


const  databaseConnect = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'raji8897',
    database: 'ecommerceapp',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });

module.exports={
    databaseConnect
   
}