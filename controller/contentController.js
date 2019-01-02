const contentDao = require("../dao/contentDao");
/*反序列化*/
const querystring = require('querystring');
const path=require("path");

const contentController = {
    /*商品详细信息*/
    details:function (req,res) {
        contentDao.commonInfo([req.query.proId])
            .then(function (data1) {
                contentDao.queryWoodNum([req.query.proId])
                    .then(function (data2) {
                        contentDao.queryColorNum([req.query.proId])
                            .then(function (data3) {
                                contentDao.queryFormatNum([req.query.proId])
                                    .then(function (data4) {
                                        console.log(data4);
                                        contentDao.queryFirst([req.query.proId])
                                            .then(function (data5) {
                                                var ps_id=data5[0].ps_id;
                                                contentDao.queryImgNum([ps_id])
                                                    .then(function (data6) {
                                                        var currentProName=data1[0].proName;
                                                        var detailsWords = data1[0].details;
                                                        var car_address =data6[0].car_address;
                                                        var detail_address =data6[0].detail_address;
                                                        res.render("details", {
                                                            currentProName:currentProName,
                                                            currentProId:req.query.proId,
                                                            commonInfo: data1,
                                                            queryWoodNum:data2,
                                                            queryColorNum:data3,
                                                            queryFormatNum:data4,
                                                            queryFirstH:data5,
                                                            queryFirstJ:JSON.stringify(data5),
                                                            car_address:car_address,
                                                            detail_address:detail_address,
                                                            detailsWords:JSON.parse(detailsWords),
                                                            typeOne:req.query.typeOne
                                                        });
                                                    })
                                            })
                                    })
                            })
                    })

            })
    },
    /*商品规格变换查询*/
    innerQuery:function (req, res) {
        contentDao.queryFormatId([req.query.sql,req.query.innerQueryArray])
            .then(function (data1) {
                if (data1.length<=0){
                    res.send("该类型商品还未上架，敬请期待。")
                }
                else {
                    contentDao.queryFormatInfo([data1[0].ps_id])
                        .then(function (data2) {
                            contentDao.queryImgNum(data1[0].ps_id)
                                .then(function (data3) {
                                    var car_address =data3[0].car_address;
                                    var detail_address =data3[0].detail_address;
                                    res.send({
                                        car_address:car_address,
                                        detail_address:detail_address,
                                        queryFirstJ:data2
                                    })
                                })
                        })
                }
            })
    },
    /*加入购物车*/
    addShopingCart:function (req, res) {
        contentDao.addShopingCart([null,req.query.currentPsId,req.session.userId,1,req.query.goodsNum,req.query.subTotal,req.query.currrentQuantity,req.query.currentPrice])
            .then(function (data1) {
                contentDao.queryShopingCarTotal([req.session.userId])
                    .then(function (data2) {
                        res.send(data2);
                    })
            })
    },
    /*通过页面按钮进入购物车页面*/
    shopingCart:function (req, res) {
        contentDao.addShopingCart([null,req.query.currentPsId,req.session.userId,1,req.query.goodsNum,req.query.subTotal,req.query.currrentQuantity,req.query.currentPrice])
            .then(function (data1) {
                contentDao.queryShopingCar([req.session.userId])
                    .then(function (data2) {
                        contentDao.queryShopingCarTotal([req.session.userId])
                            .then(function (data3) {
                                res.render("cart",{
                                    typeOne:0,
                                    cartInfo:data2,
                                    ShopingCarTotal:data3});
                            })
                    })
            })

    },
    /*通过模态框按钮进入购物车页面*/
    shopingCartByModal:function (req, res) {
        contentDao.queryShopingCar([req.session.userId])
            .then(function (data1) {
                contentDao.queryShopingCarTotal([req.session.userId])
                    .then(function (data2) {
                        res.render("cart",{
                            typeOne:0,
                            cartInfo:data1,
                            ShopingCarTotal:data2});
                    })
            })
    },
    /*删除购物车*/
    deleteShopingCart:function (req, res) {
        contentDao.deleteShopingCart([req.session.userId,req.query.psId])
            .then(function (data1) {
                contentDao.queryShopingCarTotal([req.session.userId])
                    .then(function (data2) {
                        res.send(data2);
                    })
            })
    },
    /*修改购物车中商品数量*/
    updateGoodsNum:function (req, res) {
        contentDao.updateGoodsNum([req.query.currentGoodsNum,req.query.currentTotalMoney,req.session.userId,req.query.psId])
            .then(function (data1) {
                contentDao.queryShopingCarTotal([req.session.userId])
                    .then(function (data2) {
                        res.send(data2);
                    })
            })
    },
    /*产生订单*/
    createOrder:function (req,res) {
       var nowDate = new Date();
       var orderNum=String(nowDate.getFullYear())+String((nowDate.getMonth()+1))+String(nowDate.getDate())+String(nowDate.getHours())+String(nowDate.getMinutes())+String(nowDate.getSeconds());
       var orderTime=String(nowDate.getFullYear())+"-"+String((nowDate.getMonth()+1))+"-"+String(nowDate.getDate())+" "+String(nowDate.getHours())+":"+String(nowDate.getMinutes())+":"+String(nowDate.getSeconds());
       contentDao.queryShopingCarTotal([[req.session.userId]])
           .then(function (data1) {
               contentDao.createOrder([null,req.session.userId,null,orderNum,data1[0].subTotal,orderTime,"未付款",null])
                   .then(function (data2) {
                        contentDao.queryOrderId([orderNum])
                            .then(function (data3) {
                                /*console.log(data3);*/
                                /*req.session.orderId=data3[0].orderId;*/
                                contentDao.queryShopingCar([req.session.userId])
                                    .then(function (data4) {
                                        for (var i=0;i<data4.length;i++){
                                            contentDao.createOrderDetails([null,data3[0].orderId,data4[i].ps_id,data4[i].count,data4[i].subtotal])
                                        }
                                        contentDao.queryOrderDetails(data3[0].orderId)
                                            .then(function (data6) {
                                                contentDao.queryOrderTotal([data3[0].orderId])
                                                    .then(function (data7) {
                                                        contentDao.queryAddressInfo([req.session.userId])
                                                            .then(function (data8) {
                                                                console.log(data8);
                                                                res.render("buy",{
                                                                    orderDetails:data6,
                                                                    typeOne:0,
                                                                    orderTotal:data7,
                                                                    orderTotalJ:JSON.stringify(data6),
                                                                    orderNum:orderNum,
                                                                    addressInfo:data8
                                                                });
                                                            })

                                                    })

                                            })
                                    })
                            })
                   })
           })
    },
   /* /!*进入订单页面*!/
    orderPage:function (req, res) {
        console.log(req.session.orderId);
    }*/
   /*删除地址*/
    deleteAddress:function (req, res) {
        contentDao.deleteAddress([req.query.addressId])
            .then(function (data) {
                res.send(data);
            })
    },
    /*进入支付页面*/
    goBuy:function (req, res) {
        contentDao.queryOrderTotal([req.query.currentOrderId])
            .then(function (data) {
               /* console.log(req.query.currentOrderId);*/
                res.render("pay",{
                    orderTotal:data,
                    currentorderNum:req.query.currentorderNum,
                    currentOrderId:req.query.currentOrderId,
                    currentAddressId:req.query.currentAddressId,
                    typeOne:0
                })
            })
    },
    /*确认支付*/
    surePay:function (req, res) {
        contentDao.updateOrder([req.query.currentAddressId,"已付款",req.query.currentOrderId])
            .then(function (data1) {
                contentDao.queryOrderGoodsNum([req.query.currentOrderId])
                    .then(function (data2) {
                        for (var i=0;i<data2.length;i++){
                            contentDao.updateQuantity([data2[i].ps_id,data2[i].od_num]);
                        }
                        contentDao.deleteAllShopingCart([req.session.userId])
                            .then(function (data) {
                                res.render("paySuccess",{
                                    typeOne:0
                                })
                            })

                    })
            })
    },
    /*支付判断*/
    surePayJudge:function (req, res) {
        console.log(req.body.pwd);
        contentDao.judgeUserPay([req.body.userName,req.body.pwd])
            .then(function (data1) {
                console.log(data1);
                res.send(data1);
            })
    },
    /*进入vip页面*/
    vip:function (req, res) {
        res.render("vip",{
            typeOne:0
        })
    },
	// 家居商品详情
    grocery_detail(req,res){
        console.log(req.query.id)
        //查找某个id 的详情内容
        contentDao.grocery_detail([req.query.id])
            .then(function (data) {
                var data=JSON.stringify(data);
                //详情下的更多商品
                 contentDao.grocery_goods_more([4])
                     .then(function (data1) {
                            // console.log("======================================contentcontroller    data========================================");

                            // res.render("grocery_detail",{typeOne:req.query.typeOne,data:data});
                            console.log(data);
                            console.log(data1);
                            // console.log("======================================contentcontroller    data1========================================");
                            var data1=JSON.stringify(data1);
                            res.render("grocery_detail",{'typeOne':req.query.typeOne,'data':data,'data1':data1});

            });

        });

    },
    getTu(req,res){
        // contentDao.getTu([]).then((data)=>{
        //     // res.send(data);
        //     console.log(data)
        // })

        var data=["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"]
        var data1=[3000, 5000, 7000, 6500, 4089, 7480,5360,4500,4360,6690,7850,5560]
        res.send([data,data1]);
    },
    xiaoshou(req,res){
        // contentDao.getTu([]).then((data)=>{
        //     // res.send(data);
        //     console.log(data)
        // })

        var data=["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"]
        var data1=[3000, 5000, 7000, 6500, 4089, 7480,5360,4500,4360,6690,7850,5560]
        res.send([data,data1]);
    },
};
module.exports=contentController;
