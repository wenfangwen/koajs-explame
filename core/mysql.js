// mysql.js
var mysql = require('mysql');

//建立连接的方法

class Mysql {
  constructor() {
    var connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'ay_xiandao'
    });
    connection.connect();
    this.conn = connection;
  }
  query(sql, parmas) {
    return new Promise((reject, resolve) => {
      //2执行sql语句
      this.conn.query(sql, parmas, function(error, results, fields) {
        if (error) {
          throw error;
        }
        reject(results);
      });
      //3关闭连接
      //   this.conn.end();
    });
  }
}

module.exports = new Mysql();
