const dbpool = require("../config/dbpoolconfig");

const formatDao = {
    queryTypeInfo:function (params) {
        return new Promise(function (resolve, reject) {
            dbpool.connect("SELECT * FROM `secondcategory` limit 8",params,function (error, data) {
                if (!error){
                    resolve(data);
                }
                else {
                    console.log(error);
                    reject(error);
                }
            })
        })
    },
    queryColorInfo:function (params) {
        return new Promise(function (resolve, reject) {
            dbpool.connect("SELECT	* FROM `colorinfo` limit 8",params,function (error, data) {
                if (!error){
                    resolve(data);
                }
                else {
                    console.log(error);
                    reject(error);
                }
            })
        })
    },
    queryWoodInfo:function (params) {
        return new Promise(function (resolve, reject) {
            dbpool.connect("SELECT	* FROM `woodinfo` limit 8",params,function (error, data) {
                if (!error){
                    resolve(data);
                }
                else {
                    console.log(error);
                    reject(error);
                }
            })
        })
    },
    queryFvInfo:function (params) {
        return new Promise(function (resolve, reject) {
            dbpool.connect("SELECT	* FROM `formatvalue` limit 8",params,function (error, data) {
                if (!error){
                    resolve(data);
                }
                else {
                    console.log(error);
                    reject(error);
                }
            })
        })
    },
    queryColorIsExist:function (params) {
        return new Promise(function (resolve, reject) {
            dbpool.connect("SELECT * FROM `colorinfo` where ci_color=?",params,function (error, data) {
                if (!error){
                    resolve(data);
                }
                else {
                    console.log(error);
                    reject(error);
                }
            })
        })
    },
    insertColor:function (params) {
        return new Promise(function (resolve, reject) {
            dbpool.connect("insert into `colorinfo` values(null,?)",params,function (error, data) {
                if (!error){
                    resolve(data);
                }
                else {
                    console.log(error);
                    reject(error);
                }
            })
        })
    },
    queryColorGoods:function (params) {
        return new Promise(function (resolve, reject) {
            dbpool.connect("select * from prospecs where ci_id=?",params,function (error, data) {
                if (!error){
                    resolve(data);
                }
                else {
                    console.log(error);
                    reject(error);
                }
            })
        })
    },
    deleteColor:function (params) {
        return new Promise(function (resolve, reject) {
            dbpool.connect("delete from colorinfo where ci_id=?",params,function (error, data) {
                if (!error){
                    resolve(data);
                }
                else {
                    console.log(error);
                    reject(error);
                }
            })
        })
    },
    queryColorById:function (params) {
        return new Promise(function (resolve, reject) {
            dbpool.connect("SELECT * FROM `colorinfo` where ci_id=?",params,function (error, data) {
                if (!error){
                    resolve(data);
                }
                else {
                    console.log(error);
                    reject(error);
                }
            })
        })
    },
    updateColor:function (params) {
        return new Promise(function (resolve, reject) {
            dbpool.connect("update colorinfo set ci_color=? where ci_id=?",params,function (error, data) {
                if (!error){
                    resolve(data);
                }
                else {
                    console.log(error);
                    reject(error);
                }
            })
        })
    },
};
module.exports=formatDao;