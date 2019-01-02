const userDao=require("../dao/userDao");/*引入userDao*/
var querystring = require('querystring');//反序列化引入
const userController={
    //登录
    login:function(req,resp){
        var userName=req.body.userName;
        var userPwd=req.body.pwd;
        userDao.userlogin([userName,userPwd]).then(function(data){
                if (data.length>0){
                    req.session.userName=data[0].userName;
                    req.session.userId=data[0].userId;
                    req.session.userPwd=data[0].userPwd;
                    req.session.phone=data[0].phone;
                    req.session.email=data[0].email;
                    resp.send(data);
                    /*if(req.session.preUrl){
                     resp.redirect(req.session.preUrl);
                     }else{
                     resp.render("personal",{
                     userId:data[0].userId,
                     userName:data[0].userName,
                     userPwd:data[0].userPwd,
                     phone:data[0].phone,
                     email:data[0].email,
                     typeOne:req.query.typeOne
                     });
                     }*/
                }else{
                    resp.send(data);
                }
            }
        )
    },
    //注册
    regiter:function(req,resp){
        var userName=req.body.userName;
        var userPwd=req.body.pwd;
        userDao.userRegiter([userName,userPwd]).then(function(data){
            // console.log("Regiter:"+data);
            resp.send(data);
            // resp.render("furnitureRecommend",{
            //     // successs:"注册成功",
            //     typeOne:req.query.typeOne
            // });
        })
    },
    //修改用户信息
    edituser:function(req,resp){
        var userId=req.body.userId;
        var userName=req.body.userName;
        var userPwd=req.body.userPwd;
        var phone=req.body.phone;
        var email=req.body.email;
        userDao.edituser([userName,userPwd,phone,email,userId]).then(function(data1){
            userDao.queryuser([req.session.userId])
                .then(function (data2) {
                    resp.send(data2);
                })
        });
    },
    //获取用户的全部地址信息
    getAllDddress:function(req,resp){
        var userId=req.query.userId;
        userDao.getAllDddress([userId]).then(function(data){
            resp.send(data);
        })
    },
    //添加地址
    addDddress:function(req,resp){
        var alladdr=req.body.alladdr;
        var userId=req.body.userId;
        //反序列化,获得表单的值
        var result = querystring.parse(alladdr);
        var names=result.names;
        var phone=result.phone;
        var phone1=result.phone1;
        var cmbProvince=result.cmbProvince;
        var cmbCity=result.cmbCity;
        var cmbArea=result.cmbArea;
        var addresss=result.addresss;
        userDao.addDddress([userId,names,phone,phone1,cmbProvince,cmbCity,cmbArea,addresss]).then(function(data){
            resp.send(data);
        })
    },
    //获得点击的地址信息
    editthisAddr:function(req,resp){
        var addrid=req.body.addrid;
        userDao.editthisAddr([addrid]).then(function(data){
            resp.send(data);
        })
    },
    editadrress:function(req,resp){
        var userId=req.body.userId;
        var addrid1=req.body.addrid1;
        var names=req.body.rename;
        var phone=req.body.rephone;
        var phone1=req.body.rephone1;
        var cmbProvince=req.body.cmbProvince1;
        var cmbCity=req.body.cmbCity1;
        var cmbArea=req.body.cmbArea1;
        var addresss=req.body.readdress;
        userDao.editadrress([names,phone,phone1,cmbProvince,cmbCity,cmbArea,addresss,userId,addrid1]).then(function(data1){
            userDao.editthisAddr([addrid1])
                .then(function (data2) {
                    resp.send(data2);
                })
        })
    },
    //删除地址信息
    delthisAddr:function(req,resp){
        var addrid=req.body.addrid;
        userDao.delthisAddr([addrid]).then(function(data){
            resp.send(data);
        })
    },
    //获取用户的全部订单信息
    getAllorders:function (req,resp) {
        // let pageCount=7;//每页展示3条信息
        let userId=req.query.userId;
        // let currentPage=1;
        // let currentPage=req.query.currentPage;
        // console.log("currentPage:"+currentPage);
        userDao.getAllorders([userId]).then(function(data){
            resp.send(data);
        })
    },
    //订单详细信息页面
    orderPage:function (req,resp) {
        var orderId=req.query.orderId;
        userDao.orderPage([orderId]).then(function(data){
            resp.render("orderPage",{
                mydata:data,
                typeOne:req.query.typeOne
            });
        })
    },
    /*进入订单页面*/
    showOrder:function (req,resp) {
        resp.render("personal",{
            userName:req.session.userName,
            userId:req.session.userId,
            userPwd:req.session.userPwd,
            phone:req.session.phone,
            email:req.session.email,
            typeOne:0
        })
    },

//    =================后台管理请求=================================
//    获取所有用户的购物车信息
    getAllcart:function (req,resp) {
        let pageCount=7;//每页展示3条信息
        let currentPage=req.query.currentPage;//当前展示第几页
        let proname=req.query.proname;//要查询的内容
        userDao.getAllcart([proname,(currentPage-1)*pageCount,pageCount]).then(function(data){
            resp.send(data);
        })
    },
    //获取购物车条数
    getAllcartCount:function (req,resp) {
        userDao.getAllcartCount([req.query.proname]).then(function(data){
            resp.send(data);
        })
    },
//    获取所有用户的订单信息
    getAllorderItem:function (req,resp) {
        let pageCount=7;//每页展示3条信息
        let currentPage=req.query.currentPage;//当前展示第几页
        let proname=req.query.proname;//要查询的内容
        userDao.getAllorderItem([proname,(currentPage-1)*pageCount,pageCount]).then(function(data){
            resp.send(data);
        })
    },
    //获取订单条数
    getAllorderItemCount:function (req,resp) {
        userDao.getAllorderItemCount([req.query.proname]).then(function(data){
            resp.send(data);
        })
    },
    //    获取每条订单的详细信息
    getAllorderDetails:function (req,resp) {
        let pageCount=7;//每页展示3条信息
        let currentPage=req.query.currentPage;//当前展示第几页
        let proname=req.query.proname;//要查询的内容
        userDao.getAllorderDetails([req.query.id,proname,(currentPage-1)*pageCount,pageCount]).then(function(data){
            resp.send(data);
        })
    },
    //    获取每条订单的详细信息条数
    getAllorderDetailsCount:function (req,resp) {
        userDao.getAllorderDetailsCount([req.query.id,req.query.proname]).then(function(data){
            resp.send(data);
        })
    },
    //获取所有用户订单信息按照时间升序
    getAllorderItemtimeAsc:function (req,resp) {
        let pageCount=7;//每页展示3条信息
        let currentPage=req.query.currentPage;//当前展示第几页
        userDao.getAllorderItemtimeAsc([(currentPage-1)*pageCount,pageCount]).then(function(data){
            resp.send(data);
        })
    },
    //获取所有用户订单信息按照时间降序
    getAllorderItemtimeDesc:function (req,resp) {
        let pageCount=7;//每页展示3条信息
        let currentPage=req.query.currentPage;//当前展示第几页
        userDao.getAllorderItemtimeDesc([(currentPage-1)*pageCount,pageCount]).then(function(data){
            resp.send(data);
        })
    },
//获取所有用户订单信息按照价格升序
    getAllorderItempriceAsc:function (req,resp) {
        let pageCount=7;//每页展示3条信息
        let currentPage=req.query.currentPage;//当前展示第几页
        userDao.getAllorderItempriceAsc([(currentPage-1)*pageCount,pageCount]).then(function(data){
            resp.send(data);
        })
    },
    //获取所有用户订单信息按照价格降序
    getAllorderItempriceDesc:function (req,resp) {
        let pageCount=7;//每页展示3条信息
        let currentPage=req.query.currentPage;//当前展示第几页
        userDao.getAllorderItempriceDesc([(currentPage-1)*pageCount,pageCount]).then(function(data){
            resp.send(data);
        })
    },
    ////根据订单号查询订单信息
    getorderItemById:function (req,resp) {
        let index=req.query.index;//要查询的内容
        userDao.getorderItemById([index]).then(function(data){
            resp.send(data);
        })
    },
    //
    delorderItemById:function (req,resp) {
        let index=req.query.orderId;//要查询的内容
        userDao.delorderdetailById([index]).then(function(data1){
            userDao.delorderItemById([index]).then(function(data2) {
                resp.send(data2);
            })
        })
    },
    editOrderItem:function (req,resp) {
        let index=req.query.index;//要查询的内容
        let orderItemName=req.query.orderItemName;
        let defaultProvince=req.query.defaultProvince;
        let defaultCity=req.query.defaultCity;
        let defaultArea=req.query.defaultArea;
        let orderItemAddress=req.query.orderItemAddress;
        let orderItemPhone=req.query.orderItemPhone;
        let orderItemPrice=req.query.orderItemPrice;
        let orderItemState=req.query.orderItemState;
        userDao.queryOrderItemByid([index]).then(function(data1){
            userDao.insertaddress([data1[0].userId,orderItemName,orderItemPhone,defaultProvince,defaultCity,defaultArea,orderItemAddress]).then(function (data2) {
                userDao.getAddressid().then(function(data3){
                    userDao.updateOrderItemByid([data1[0].userId,data3[0].addrId,orderItemPrice,orderItemState,index]).then(function(data4){
                        resp.send(data4);
                    })
                })

            })
        })
    },
};

module.exports=userController;