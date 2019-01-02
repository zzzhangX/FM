const mysql = require("mysql");
const dbpool = {
    pool:{},
    config:{
        host:"localhost",
        port:"3306",
        user:"root",
        password:"root",
        database:"threepart"
    },
    create:function () {
        this.pool=mysql.createPool(this.config);
    },
    connect:function (sql,arr,fn) {
        this.pool.getConnection(function (error, connection) {
            connection.query(sql,arr,fn);
            connection.release();
        })
    }
};
dbpool.create();
module.exports=dbpool;
