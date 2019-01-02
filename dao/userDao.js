const dbpool=require("../config/dbpoolconfig");/*引入文件*/

const userDao={
    //用户登录
    userlogin:function (params) {
        return new Promise(function (resolve,reject) {
            dbpool.connect("select * from userinfo where userName=? and userPwd=?",params,function(err,data){
                if(!err){
                    resolve(data);
                    console.log("login:"+data);
                } else {
                    reject(err);
                }
            })
        })
    },
    //查找用户数据
    queryuser:function (params) {
        return new Promise(function (resolve,reject) {
            dbpool.connect("select * from userinfo where userId=?",params,function(err,data){
                if(!err){
                    resolve(data);
                } else {
                    reject(err);
                }
            })
        })
    },
    //用户注册
    userRegiter:function (params) {
        return new Promise(function (resolve,reject) {
            dbpool.connect("insert into userinfo values (null,?,?,null,null)",params,function(err,data){
                if(!err){
                    resolve(data);
                } else {
                    reject(err);
                }
            })
        })
    },
    //修改用户信息
    edituser:function(params){
        return new Promise(function (resolve,reject) {
            dbpool.connect("UPDATE userinfo SET userName=?,userPwd=?,phone=?,email=? WHERE userId=?",params,(err,data)=>{
                if(!err){
                    resolve(data);
                } else {
                    reject(err);
                }
            })
        })
    },
    //获取用户全部地址信息
    getAllDddress:function (params) {
        return new Promise(function (resolve,reject) {
            dbpool.connect("select * from addressinfo where userId=? limit 0,7",params,function(err,data){
                if(!err){
                    resolve(data);
                } else {
                    reject(err);
                }
            })
        })
    },
    //添加地址
    addDddress:function(params){
        console.log(params);
        return new Promise(function (resolve,reject) {
            dbpool.connect("insert into addressinfo values(null,?,?,?,?,?,?,?,?,0)",params,(err,data)=>{
                // console.log("addDddressdata:"+data);
                if(!err){
                    resolve(data);
                } else {
                    console.log(err);
                    reject(err);
                }
            })
        }).catch(err=>{
            console.log('err :',err);
        });
    },
    //根据id获得地址信息
    editthisAddr:function(params){
        return new Promise(function (resolve,reject) {
            dbpool.connect("select * from addressinfo where id= ?",params,(err,data)=>{
                if(!err){
                    resolve(data);
                } else {
                    reject(err);
                }
            })
        })
    },
    editadrress:function(params){
        return new Promise(function (resolve,reject) {
            dbpool.connect("UPDATE addressinfo SET name=?,phone=?,phone1=?,province=?,city=?,district=?,address=? WHERE userId=? and id=?",params,(err,data)=>{
                if(!err){
                    resolve(data);
                } else {
                    reject(err);
                }
            })
        }).catch(err=>{
            console.log('err :',err);
        });
    },
    //删除地址
    delthisAddr:function (params) {
        return new Promise(function (resolve,reject) {
            dbpool.connect("delete from addressinfo where id= ?",params,function(err,data){
                if(!err){
                    resolve(data);
                } else {
                    reject(err);
                }
            })
        })
    },
    //获取用户全部订单信息
    getAllorders:function (params) {
        return new Promise(function (resolve,reject) {
            dbpool.connect("SELECT\n" +
                "    addressinfo.name\n" +
                "    , orders.orderId\n" +
                "    , orders.orderNum\n" +
                "    , orders.ordertime\n" +
                "    , orders.state\n" +
                "    , orders.total\n" +
                "FROM\n" +
                "    threepart.orders\n" +
                "    INNER JOIN threepart.addressinfo \n" +
                "        ON (orders.id = addressinfo.id)\n" +
                "        WHERE orders.userId=? limit 0,7;",params,(err,data)=>{
                if(!err){
                    resolve(data);
                } else {
                    reject(err);
                }
            })
        })
    },
    orderPage:function(params){
        return new Promise(function (resolve,reject) {
            dbpool.connect("SELECT\n" +
                "    orders.orderNum\n" +
                "    , orders.state\n" +
                "    , prospecs.imgaddress\n" +
                "    , product.proName\n" +
                "    , orderdetail.od_num\n" +
                "    , orderdetail.od_subtotal\n" +
                "    , addressinfo.name\n" +
                "    , addressinfo.phone\n" +
                "    , addressinfo.province\n" +
                "    , addressinfo.city\n" +
                "    , addressinfo.address\n" +
                "    , addressinfo.district\n" +
                "    , orders.orderId\n" +
                "FROM\n" +
                "    threepart.orderdetail\n" +
                "    INNER JOIN threepart.orders \n" +
                "        ON (orderdetail.orderId = orders.orderId)\n" +
                "    INNER JOIN threepart.prospecs \n" +
                "        ON (orderdetail.ps_id = prospecs.ps_id)\n" +
                "    INNER JOIN threepart.addressinfo \n" +
                "        ON (orders.id = addressinfo.id)\n" +
                "    INNER JOIN threepart.product \n" +
                "        ON (prospecs.proId = product.proId) where orders.orderId=?",params,(err,data)=>{
                if(!err){
                    resolve(data);
                } else {
                    reject(err);
                }
            })
        })
    },

    //=========================后台管理的请求==========================
    //    获取所有用户的购物车信息
    getAllcart:function (params) {
        return new Promise(function (resolve,reject) {
            dbpool.connect("SELECT\n" +
                "    cart.cartId\n" +
                "    , cart.userId\n" +
                "    , cart.ps_id\n" +
                "    , cart.count\n" +
                "    , cart.subtotal\n" +
                "    , product.proName\n" +
                "    , prospecs.imgaddress\n" +
                "    , woodinfo.w_wood\n" +
                "    , colorinfo.ci_color\n" +
                "    , formatvalue.fv_name\n" +
                "FROM\n" +
                "    threepart.cart\n" +
                "    INNER JOIN threepart.prospecs \n" +
                "        ON (cart.ps_id = prospecs.ps_id)\n" +
                "    LEFT JOIN threepart.product \n" +
                "        ON (prospecs.proId = product.proId)\n" +
                "    LEFT JOIN threepart.woodinfo \n" +
                "        ON (prospecs.w_id = woodinfo.w_id)\n" +
                "    LEFT JOIN threepart.colorinfo \n" +
                "        ON (prospecs.ci_id = colorinfo.ci_id)\n" +
                "    LEFT JOIN threepart.formatvalue \n" +
                "        ON (prospecs.fv_id = formatvalue.fv_id) where product.proName like ? limit ?,?;",["%"+params[0]+"%",params[1],params[2]],(err,data)=>{
                if(!err){
                    resolve(data);
                } else {
                    reject(err);
                }
            })
        })
    },
    //获取购物车总的条数
    getAllcartCount:function (params) {
        let pageCount=7;//每页显示三条
        return new Promise((resolve,reject)=>{
            dbpool.connect("SELECT COUNT(*) AS totalcount\n" +
                "FROM\n" +
                "    threepart.cart\n" +
                "    INNER JOIN threepart.prospecs \n" +
                "        ON (cart.ps_id = prospecs.ps_id)\n" +
                "    INNER JOIN threepart.product \n" +
                "        ON (prospecs.proId = product.proId)\n" +
                "    LEFT JOIN threepart.woodinfo \n" +
                "        ON (prospecs.w_id = woodinfo.w_id)\n" +
                "    LEFT JOIN threepart.colorinfo \n" +
                "        ON (prospecs.ci_id = colorinfo.ci_id)\n" +
                "    LEFT JOIN threepart.formatvalue \n" +
                "        ON (prospecs.fv_id = formatvalue.fv_id)\n" +
                "        WHERE product.proName LIKE ? ",
                ["%"+params[0]+"%"],
                (err, data) => {
                    if (!err) {
                        let result=Math.ceil(data[0].totalcount/pageCount);
                        result=String(result);
                        resolve(result);
                    } else {
                        reject(err);
                    }
                }
            )
        })
    },
//    获取所有用户的订单信息
    getAllorderItem:function (params) {
        return new Promise(function (resolve,reject) {
            dbpool.connect( "SELECT\n" +
                "    orders.orderId\n" +
                "    , orders.orderNum\n" +
                "    , addressinfo.name\n" +
                "    , orders.ordertime\n" +
                "    , addressinfo.phone\n" +
                "    , addressinfo.province\n" +
                "    , addressinfo.city\n" +
                "    , addressinfo.address\n" +
                "    , addressinfo.district\n" +
                "    , orders.state\n" +
                "    , orders.total\n" +
                "FROM\n" +
                "    threepart.orders\n" +
                "    INNER JOIN threepart.addressinfo \n" +
                "        ON (orders.id = addressinfo.id) where orders.orderNum like ? limit ?,?;",["%"+params[0]+"%",params[1],params[2]],(err,data)=>{
                if(!err){
                    resolve(data);
                } else {
                    reject(err);
                }
            })
        })
    },
    //获取所有订单的列数
    getAllorderItemCount:function (params) {
        let pageCount=7;//每页显示七条
        return new Promise((resolve,reject)=>{
            dbpool.connect( "SELECT COUNT(*) AS totalcount\n" +
                "FROM\n" +
                "    threepart.orders\n" +
                "    LEFT JOIN threepart.addressinfo \n" +
                "        ON (orders.id = addressinfo.id) where orders.orderNum like ?;",
                ["%"+params[0]+"%"],
                (err, data) => {
                    if (!err) {
                        let result=Math.ceil(data[0].totalcount/pageCount);
                        result=String(result);
                        resolve(result);
                    } else {
                        reject(err);
                    }
                }
            )
        })
    },

    getAllorderDetails:function (params) {
        return new Promise(function (resolve,reject) {
            dbpool.connect("SELECT\n" +
                "    orderdetail.od_id\n" +
                "    ,orderdetail.orderId\n" +
                "    , orders.userId\n" +
                "    , product.proName\n" +
                "    , colorinfo.ci_color\n" +
                "    , formatvalue.fv_name\n" +
                "    , woodinfo.w_wood\n" +
                "    , prospecs.imgaddress\n" +
                "    , orderdetail.od_num\n" +
                "    , prospecs.ps_price\n" +
                "FROM\n" +
                "    threepart.orderdetail\n" +
                "    INNER JOIN threepart.orders \n" +
                "        ON (orderdetail.orderId = orders.orderId)\n" +
                "    INNER JOIN threepart.prospecs \n" +
                "        ON (orderdetail.ps_id = prospecs.ps_id)\n" +
                "    LEFT JOIN threepart.product \n" +
                "        ON (prospecs.proId = product.proId)\n" +
                "    LEFT JOIN threepart.woodinfo \n" +
                "        ON (prospecs.w_id = woodinfo.w_id)\n" +
                "    LEFT JOIN threepart.colorinfo \n" +
                "        ON (prospecs.ci_id = colorinfo.ci_id)\n" +
                "    LEFT JOIN threepart.formatvalue \n" +
                "        ON (prospecs.fv_id = formatvalue.fv_id) where orders.orderId=? and product.proName like ? limit ?,?;",[params[0],"%"+params[1]+"%",params[2],params[3]],(err,data)=>{
                if(!err){
                    resolve(data);
                } else {
                    reject(err);
                }
            })
        })
    },
    getAllorderDetailsCount:function (params) {
        let pageCount=7;//每页显示七条
        return new Promise((resolve,reject)=>{
            dbpool.connect( "SELECT COUNT(*) AS totalcount\n" +
                "FROM\n" +
                "    threepart.orderdetail\n" +
                "    INNER JOIN threepart.orders \n" +
                "        ON (orderdetail.orderId = orders.orderId)\n" +
                "    INNER JOIN threepart.prospecs \n" +
                "        ON (orderdetail.ps_id = prospecs.ps_id)\n" +
                "    LEFT JOIN threepart.product \n" +
                "        ON (prospecs.proId = product.proId)\n" +
                "    LEFT JOIN threepart.woodinfo \n" +
                "        ON (prospecs.w_id = woodinfo.w_id)\n" +
                "    LEFT JOIN threepart.colorinfo \n" +
                "        ON (prospecs.ci_id = colorinfo.ci_id)\n" +
                "    LEFT JOIN threepart.formatvalue \n" +
                "        ON (prospecs.fv_id = formatvalue.fv_id) where orders.orderId=? and product.proName like ?;",
                [params[0],"%"+params[1]+"%"],
                (err, data) => {
                    if (!err) {
                        let result=Math.ceil(data[0].totalcount/pageCount);
                        result=String(result);
                        resolve(result);
                    } else {
                        reject(err);
                    }
                }
            )
        })
    },
//获取所有用户订单信息按照时间升序
    getAllorderItemtimeAsc:function (params) {
        return new Promise(function (resolve,reject) {
            dbpool.connect( "SELECT\n" +
                "    orders.orderId\n" +
                "    , orders.orderNum\n" +
                "    , addressinfo.name\n" +
                "    , orders.ordertime\n" +
                "    , addressinfo.phone\n" +
                "    , addressinfo.province\n" +
                "    , addressinfo.city\n" +
                "    , addressinfo.address\n" +
                "    , addressinfo.district\n" +
                "    , orders.state\n" +
                "    , orders.total\n" +
                "FROM\n" +
                "    threepart.orders\n" +
                "    INNER JOIN threepart.addressinfo \n" +
                "        ON (orders.id = addressinfo.id) ORDER BY orders.ordertime ASC limit ?,?;",params,(err,data)=>{
                if(!err){
                    resolve(data);
                } else {
                    reject(err);
                }
            })
        })
    },
    //获取所有用户订单信息按照时间降序
    getAllorderItemtimeDesc:function (params) {
        return new Promise(function (resolve,reject) {
            dbpool.connect( "SELECT\n" +
                "    orders.orderId\n" +
                "    , orders.orderNum\n" +
                "    , addressinfo.name\n" +
                "    , orders.ordertime\n" +
                "    , addressinfo.phone\n" +
                "    , addressinfo.province\n" +
                "    , addressinfo.city\n" +
                "    , addressinfo.address\n" +
                "    , addressinfo.district\n" +
                "    , orders.state\n" +
                "    , orders.total\n" +
                "FROM\n" +
                "    threepart.orders\n" +
                "    INNER JOIN threepart.addressinfo \n" +
                "        ON (orders.id = addressinfo.id) ORDER BY orders.total DESC limit ?,?;",params,(err,data)=>{
                if(!err){
                    resolve(data);
                } else {
                    reject(err);
                }
            })
        })
    },
    //获取所有用户订单信息按照价格升序
    getAllorderItempriceAsc:function (params) {
        return new Promise(function (resolve,reject) {
            dbpool.connect( "SELECT\n" +
                "    orders.orderId\n" +
                "    , orders.orderNum\n" +
                "    , addressinfo.name\n" +
                "    , orders.ordertime\n" +
                "    , addressinfo.phone\n" +
                "    , addressinfo.province\n" +
                "    , addressinfo.city\n" +
                "    , addressinfo.address\n" +
                "    , addressinfo.district\n" +
                "    , orders.state\n" +
                "    , orders.total\n" +
                "FROM\n" +
                "    threepart.orders\n" +
                "    INNER JOIN threepart.addressinfo \n" +
                "        ON (orders.id = addressinfo.id) ORDER BY orders.total ASC limit ?,?;",params,(err,data)=>{
                if(!err){
                    resolve(data);
                } else {
                    reject(err);
                }
            })
        })
    },
    //获取所有用户订单信息按照价格降序
    getAllorderItempriceDesc:function (params) {
        return new Promise(function (resolve,reject) {
            dbpool.connect( "SELECT\n" +
                "    orders.orderId\n" +
                "    , orders.orderNum\n" +
                "    , addressinfo.name\n" +
                "    , orders.ordertime\n" +
                "    , addressinfo.phone\n" +
                "    , addressinfo.province\n" +
                "    , addressinfo.city\n" +
                "    , addressinfo.address\n" +
                "    , addressinfo.district\n" +
                "    , orders.state\n" +
                "    , orders.total\n" +
                "FROM\n" +
                "    threepart.orders\n" +
                "    INNER JOIN threepart.addressinfo \n" +
                "        ON (orders.id = addressinfo.id) ORDER BY orders.total DESC limit ?,?;",params,(err,data)=>{
                if(!err){
                    resolve(data);
                } else {
                    reject(err);
                }
            })
        })
    },
    //根据订单号查询订单信息
    getorderItemById:function (params) {
        return new Promise(function (resolve,reject) {
            dbpool.connect( "SELECT\n" +
                "    orders.orderId\n" +
                "    , orders.orderNum\n" +
                "    , addressinfo.name\n" +
                "    , orders.ordertime\n" +
                "    , addressinfo.phone\n" +
                "    , addressinfo.province\n" +
                "    , addressinfo.city\n" +
                "    , addressinfo.address\n" +
                "    , addressinfo.district\n" +
                "    , orders.state\n" +
                "    , orders.total\n" +
                "FROM\n" +
                "    threepart.orders\n" +
                "    INNER JOIN threepart.addressinfo \n" +
                "        ON (orders.id = addressinfo.id) where orders.orderId=?;",params,(err,data)=>{
                if(!err){
                    resolve(data);
                } else {
                    reject(err);
                }
            })
        })
    },
    //根据订单号删除订单详细信息
    delorderdetailById:function (params) {
        return new Promise(function (resolve,reject) {
            dbpool.connect("delete from orderdetail where orderId=?;",params,(err,data)=>{
                if(!err){
                    resolve(data);
                } else {
                    reject(err);
                }
            })
        })
    },
    //根据订单号删除订单信息
    delorderItemById:function (params) {
        return new Promise(function (resolve,reject) {
            dbpool.connect("delete from orders where orderId=?;",params,(err,data)=>{
                if(!err){
                    resolve(data);
                } else {
                    reject(err);
                }
            })
        })
    },
    //根据订单号查询订单单张表的信息
    queryOrderItemByid:function (params) {
        return new Promise(function (resolve,reject) {
            dbpool.connect("select * from orders where orderId=?;",params,(err,data)=>{
                if(!err){
                    resolve(data);
                } else {
                    reject(err);
                }
            })
        })
    },
    insertaddress:function (params) {
        return new Promise(function (resolve,reject) {
            dbpool.connect("insert into addressinfo values(null,?,?,?,null,?,?,?,?,0)",params,(err,data)=>{
                if(!err){
                    resolve(data);
                } else {
                    reject(err);
                }
            })
        })
    },
    getAddressid:function (params) {
        return new Promise(function (resolve,reject) {
            dbpool.connect("SELECT MAX(id) AS addrId FROM addressinfo",params,(err,data)=>{
                if(!err){
                    resolve(data);
                } else {
                    reject(err);
                }
            })
        })
    },
    updateOrderItemByid:function (params) {
        return new Promise(function (resolve,reject) {
            dbpool.connect("update orders set userId=?,id=?,total=?,state=? where orderId=?",params,(err,data)=>{
                if(!err){
                    resolve(data);
                } else {
                    reject(err);
                }
            })
        })
    }
};
//将文件开放出去
module.exports=userDao;