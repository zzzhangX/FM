/*获取配置文件*/
const dbpool = require("../config/dbpoolconfig");
const adminDao = {
    admin_login:function (params) {
        return new Promise(function (resolve, reject) {
            dbpool.connect("SELECT * from admin where adminName=? and adminpwd=?",
                params,function (err, data1) {
                    if (!err){
                        resolve(data1);
                        // console.log(data1);
                    }else {
                        // console.log(err);
                        reject(err);
                    }
                })
        })
    },
};
module.exports=adminDao;
