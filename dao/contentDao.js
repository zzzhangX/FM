/*获取配置文件*/
const dbpool = require("../config/dbpoolconfig");
const contentDao = {
    commonInfo:function (params) {
        return new Promise(function (resolve, reject) {
            dbpool.connect("SELECT `proName`,`cloth`,`proinstall`,`details`,`place` FROM `threepart`.`product` WHERE product.`proId`=?;",
                params,function (error, data) {
                    if (!error){
                        resolve(data);
                    }
                    else {
                        reject(error);
                    }
                })
        })
    },
    queryWoodNum:function (params) {
        return new Promise(function (resolve, reject) {
            dbpool.connect("SELECT DISTINCT `woodinfo`.`w_wood`"+
                "FROM `threepart`.`prospecs`"+
                "INNER JOIN `threepart`.`product`"+
                "ON (`prospecs`.`proId` = `product`.`proId`)"+
                "LEFT OUTER JOIN `threepart`.`woodinfo`"+
                "ON (`prospecs`.`w_id` = `woodinfo`.`w_id`)"+
                "LEFT OUTER JOIN `threepart`.`colorinfo`"+
                "ON (`prospecs`.`ci_id` = `colorinfo`.`ci_id`)"+
                "LEFT OUTER JOIN `threepart`.`formatvalue`"+
                "ON (`prospecs`.`fv_id` = `formatvalue`.`fv_id`)"+
                "WHERE `product`.`proId`=? AND w_wood IS NOT NULL;",params,function (error, data) {
                if (!error){
                    resolve(data);
                }
                else {
                    reject(error);
                }
            })
        })
    },
    queryColorNum:function (params) {
        return new Promise(function (resolve, reject) {
            dbpool.connect("SELECT DISTINCT `colorinfo`.`ci_color`"+
                "FROM `threepart`.`prospecs`"+
                "INNER JOIN `threepart`.`product`"+
                "ON (`prospecs`.`proId` = `product`.`proId`)"+
                "LEFT OUTER JOIN `threepart`.`woodinfo`"+
                "ON (`prospecs`.`w_id` = `woodinfo`.`w_id`)"+
                "LEFT OUTER JOIN `threepart`.`colorinfo`"+
                "ON (`prospecs`.`ci_id` = `colorinfo`.`ci_id`)"+
                "LEFT OUTER JOIN `threepart`.`formatvalue`"+
                "ON (`prospecs`.`fv_id` = `formatvalue`.`fv_id`)"+
                "WHERE `product`.`proId`=? AND ci_color IS NOT NULL;",
                params,function (error,data) {
                    if (!error){
                        resolve(data);
                    }
                    else {
                        reject(error);
                    }
                })
        })
    },
    queryFormatNum:function (params) {
        return new Promise(function (resolve, reject) {
            dbpool.connect("SELECT DISTINCT `formatvalue`.`fv_name`"+
                "FROM `threepart`.`prospecs`"+
                "INNER JOIN `threepart`.`product`"+
                "ON (`prospecs`.`proId` = `product`.`proId`)"+
                "LEFT OUTER JOIN `threepart`.`woodinfo`"+
                "ON (`prospecs`.`w_id` = `woodinfo`.`w_id`)"+
                "LEFT OUTER JOIN `threepart`.`colorinfo`"+
                "ON (`prospecs`.`ci_id` = `colorinfo`.`ci_id`)"+
                "LEFT OUTER JOIN `threepart`.`formatvalue`"+
                "ON (`prospecs`.`fv_id` = `formatvalue`.`fv_id`)"+
                "WHERE `product`.`proId`=? AND fv_name IS NOT NULL;",
                params,function (error, data) {
                    if (!error){
                        resolve(data);
                    }
                    else {
                        reject(error);
                    }
                })
        })
    },
    queryFirst:function (params) {
        return new Promise(function (resolve, reject) {
            dbpool.connect("SELECT"+
                "`product`.`proId`"+
                ",`prospecs`.`ps_id`"+
                ", `prospecs`.`quantity`"+
                ", `prospecs`.`imgaddress`"+
                ", `prospecs`.`weight`"+
                ", `prospecs`.`Delivery`"+
                ", `woodinfo`.`w_wood`"+
                ", `formatvalue`.`fv_name`"+
                ", `colorinfo`.`ci_color`"+
                ", `prospecs`.`ps_price`"+
                "FROM"+
                "`threepart`.`prospecs`"+
                "INNER JOIN `threepart`.`product`"+
                "ON (`prospecs`.`proId` = `product`.`proId`)"+
                "LEFT OUTER JOIN `threepart`.`formatvalue`"+
                "ON (`prospecs`.`fv_id` = `formatvalue`.`fv_id`)"+
                "LEFT OUTER JOIN`threepart`.`woodinfo`"+
                "ON (`prospecs`.`w_id` = `woodinfo`.`w_id`)"+
                "LEFT OUTER JOIN `threepart`.`colorinfo`"+
                "ON (`prospecs`.`ci_id` = `colorinfo`.`ci_id`)"+
                "WHERE product.`proId`=? LIMIT 1;",
                params,function (error, data) {
                    if (!error){
                        resolve(data);
                    }
                    else {
                        reject(error);
                    }
                })
        })
    },
    queryImgNum:function (params) {
        return new Promise(function (resolve, reject) {
            dbpool.connect("SELECT"+
                "`imageinfo`.`car_address`"+
                ", `imageinfo`.`detail_address`"+
                "FROM"+
                "`threepart`.`imageinfo`"+
                "INNER JOIN `threepart`.`prospecs`"+
                "ON (`imageinfo`.`ps_id` = `prospecs`.`ps_id`)"+
                "WHERE prospecs.`ps_id`=?;",
                params,function (error,data) {
                    if (!error){
                        resolve(data)
                    }
                    else {
                        reject(error);
                    }
                })
        })
    },

    queryFormatId:function (params) {
        return new Promise(function (resolve, reject) {
            /*console.log(params);*/
            dbpool.connect(params[0],params[1],function (error, data) {
                if (!error){
                    console.log(data);
                    resolve(data);
                }
                else {
                    reject(error);
                }
            })
        })
    },
    queryFormatInfo:function (params) {
        return new Promise(function (resolve, reject) {
            dbpool.connect("SELECT"+
                    "`product`.`proId`"+
                ", `prospecs`.`ps_id`"+
                ", `prospecs`.`quantity`"+
                ", `prospecs`.`imgaddress`"+
                ", `prospecs`.`weight`"+
                ", `prospecs`.`Delivery`"+
                ", `woodinfo`.`w_wood`"+
                ", `formatvalue`.`fv_name`"+
                ", `colorinfo`.`ci_color`"+
                ", `prospecs`.`ps_price`"+
            "FROM"+
                "`threepart`.`prospecs`"+
            "INNER JOIN `threepart`.`product`"+
            "ON (`prospecs`.`proId` = `product`.`proId`)"+
            "LEFT OUTER JOIN `threepart`.`formatvalue`"+
            "ON (`prospecs`.`fv_id` = `formatvalue`.`fv_id`)"+
            "LEFT OUTER JOIN`threepart`.`woodinfo`"+
            "ON (`prospecs`.`w_id` = `woodinfo`.`w_id`)"+
            "LEFT OUTER JOIN `threepart`.`colorinfo`"+
            "ON (`prospecs`.`ci_id` = `colorinfo`.`ci_id`)"+
            "WHERE prospecs.`ps_id`=?;",
                params,function (error, data) {
                    if(!error){
                        resolve(data);
                    }
                    else {
                        reject(error);
                    }
                })
        })
    },

    addShopingCart:function (params) {
        return new Promise(function (resolve, reject) {
            dbpool.connect("select * from cart where ps_id=? and userId=?",[params[1],params[2]],function (error, data) {
                if (!error){
                   if (data.length>0){
                       var count = parseInt(data[0].count)+parseInt(params[4]);
                       var subtotal = parseInt(data[0].subtotal)+parseInt(params[5]);
                       if (count<=parseInt(params[6])){
                           dbpool.connect("UPDATE cart SET COUNT=?,subtotal=? WHERE ps_id=? and userId=?;",
                               [count,subtotal,params[1],params[2]],function (error, data) {
                                   if (!error){
                                       resolve(data);
                                   }
                                   else {
                                       reject(error);
                                   }
                               })
                       }
                       else {
                           subtotal=parseInt(params[6])*parseInt(params[7]);
                           dbpool.connect("UPDATE cart SET COUNT=?,subtotal=? WHERE ps_id=? and userId=?;",
                               [parseInt(params[6]),subtotal,params[1],params[2]],function (error, data) {
                                   if (!error){
                                       resolve(data);
                                   }
                                   else {
                                       reject(error);
                                   }
                               })
                       }

                   }
                   else {
                       dbpool.connect("INSERT INTO `cart` VALUES(?,?,?,?,?,?);",params,
                       function (error, data) {
                           if (!error){
                               resolve(data);
                           }
                           else {
                               reject(error);
                           }
                       })
                   }
                }
                else {
                    reject(error);
                }
            })
        })
    },
    queryShopingCarTotal:function (params) {
        return new Promise(function (resolve, reject) {
            dbpool.connect("SELECT"+
                    "`userId`"+
                ", SUM(`count`) AS countTotal "+
                ", SUM(`subtotal`) AS subTotal "+
            "FROM"+
                "`threepart`.`cart` "+
            "WHERE userId=?;",
            params,function (error, data) {
                    if (!error){
                        resolve(data);
                    }
                    else {
                        reject(error);
                    }
                })
            })

    },

    queryShopingCar:function (params) {
        return new Promise(function (resolve, reject) {
            dbpool.connect("SELECT"+
                    "`category`.`c_id`"+
                ", `secondcategory`.`sc_Id`"+
                ", `product`.`proId`"+
                ", `prospecs`.`ps_id`"+
                ", `product`.`proName`"+
                ", `prospecs`.`ps_price`"+
                ", `prospecs`.`quantity`"+
                ", `prospecs`.`imgaddress`"+
                ", `woodinfo`.`w_wood`"+
                ", `formatvalue`.`fv_name`"+
                ", `colorinfo`.`ci_color`"+
                ", `cart`.`userId`"+
                ", `cart`.`checked`"+
                ", `cart`.`count`"+
                ", `cart`.`subtotal`"+
                ", `cart`.`cartId`"+
            "FROM"+
                "`threepart`.`product`"+
            "INNER JOIN `threepart`.`secondcategory`"+
            "ON (`product`.`sc_Id` = `secondcategory`.`sc_Id`)"+
            "INNER JOIN `threepart`.`category`"+
            "ON (`secondcategory`.`c_id` = `category`.`c_id`)"+
            "INNER JOIN `threepart`.`prospecs`"+
            "ON (`prospecs`.`proId` = `product`.`proId`)"+
            "INNER JOIN `threepart`.`cart`"+
            "ON (`cart`.`ps_id` = `prospecs`.`ps_id`)"+
            "LEFT OUTER JOIN `threepart`.`formatvalue`"+
            "ON (`prospecs`.`fv_id` = `formatvalue`.`fv_id`)"+
            "LEFT OUTER JOIN `threepart`.`colorinfo`"+
            "ON (`prospecs`.`ci_id` = `colorinfo`.`ci_id`)"+
            "LEFT OUTER JOIN `threepart`.`woodinfo`"+
            "ON (`prospecs`.`w_id` = `woodinfo`.`w_id`)"+
            "WHERE userId=?;",params,function (error, data) {
                if (!error){
                    resolve(data);
                }
                else {
                    reject(error);
                }
            })
        })
    },

    deleteShopingCart:function (params) {
        return new Promise(function (resolve, reject) {
            dbpool.connect("delete from cart where userId=? and ps_id=?",params,function (error, data) {
                if (!error){
                    resolve(data);
                }
                else {
                    reject(error);
                }
            })
        })
    },

    updateGoodsNum:function (params) {
        return new  Promise(function (resolve, reject) {
            dbpool.connect("UPDATE cart SET COUNT=?,subtotal=? WHERE userId=? and ps_id=?;",
            params,function (error, data) {
                    if (!error){
                        resolve(data);
                    }
                    else {
                        reject(error);
                    }
                })
        })
    },

    createOrder:function (params) {
        return new Promise(function (resolve, reject) {
            dbpool.connect("insert into orders values(?,?,?,?,?,?,?,?);",params,function (error, data) {
                if (!error){
                    resolve(data);
                }
                else {
                    reject(error);
                }
            })
        })
    },

    queryOrderId:function (params) {
        return new Promise(function (resolve, reject) {
            dbpool.connect("SELECT * FROM orders WHERE orderNum=?;"
                ,params,function (error, data) {
                if (!error){
                    resolve(data);
                }
                else {
                    reject(error);
                }

            })
        })
    },

    createOrderDetails:function (params) {
        return new Promise(function (resolve, reject) {
            /*for (var i=0;i<params.length;i++){*/
                dbpool.connect("insert into orderdetail values(?,?,?,?,?)",params,function (error, data) {
                    if (!error){
                        return data;
                    }
                    else {
                        reject(error);
                    }
                })
            /*}*/
        })
    },

    queryOrderDetails:function (params) {
        return new Promise(function (resolve, reject) {
            dbpool.connect("SELECT"+
                    "`orders`.`userId`"+
                ",`orderdetail`.`orderId`"+
                ", `prospecs`.`ps_id`"+
                ", `orderdetail`.`od_num`"+
                ", `orderdetail`.`od_subtotal`"+
                ", `woodinfo`.`w_wood`"+
                ", `formatvalue`.`fv_name`"+
                ", `colorinfo`.`ci_color`"+
                ", `prospecs`.`imgaddress`"+
                ", `product`.`proName`"+
            "FROM"+
                "`threepart`.`orderdetail`"+
            "INNER JOIN `threepart`.`prospecs`"+
            "ON (`orderdetail`.`ps_id` = `prospecs`.`ps_id`)"+
            "INNER JOIN `threepart`.`orders`"+
            "ON (`orderdetail`.`orderId` = `orders`.`orderId`)"+
            "INNER JOIN `threepart`.`product`"+
            "ON (`prospecs`.`proId` = `product`.`proId`)"+
            "LEFT OUTER JOIN `threepart`.`woodinfo`"+
            "ON (`prospecs`.`w_id` = `woodinfo`.`w_id`)"+
            "LEFT OUTER JOIN `threepart`.`formatvalue`"+
            "ON (`prospecs`.`fv_id` = `formatvalue`.`fv_id`)"+
            "LEFT OUTER JOIN `threepart`.`colorinfo`"+
            "ON (`prospecs`.`ci_id` = `colorinfo`.`ci_id`)"+
            "WHERE orderdetail.`orderId`=?;",params,function (error, data) {
                if (!error){
                    resolve(data);
                }
                else {
                    reject(error);
                }
            })
        })
    },

    queryOrderTotal:function (params) {
        return new Promise(function (resolve, reject) {
            dbpool.connect(" SELECT orderId,SUM(od_num) as odnumTotal,SUM(od_subtotal) as odsubTotal FROM orderdetail WHERE orderId=?;",
            params,function (error, data) {
                    if (!error){
                        /*console.log(data);*/
                        resolve(data);
                    }
                    else {
                        reject(error);
                    }
                })
        })
    },

    queryAddressInfo:function (params) {
        return new Promise(function (resolve, reject) {
            dbpool.connect("SELECT * FROM `addressinfo` WHERE userId=?;",
                params,function (error, data) {
                if (!error){
                    resolve(data);
                }
                else {
                    reject(error);
                }
            })
        })
    },

    deleteAddress:function (params) {
        return new Promise(function (resolve, reject) {
            dbpool.connect("delete from addressinfo where id=?",params,
            function (error, data) {
                if (!error){
                    resolve(data);
                }
                else {
                    reject(error);
                }
            })
        })
    },

    updateOrder:function (params) {
        return new Promise(function (resolve, reject) {
            dbpool.connect("UPDATE `orders` SET id=?,state=? WHERE orderId=?;",
            params,function (error,data) {
                if (!error){
                    /*console.log(data);*/
                    resolve(data);
                }
                else {
                    reject(error);
                }
            })
        })
    },

    judgeUserPay:function (params) {
        return new Promise(function (resolve, reject) {
            dbpool.connect("SELECT * from `userpay` WHERE up_name=? and up_pwd=?;",
                params, function (error, data) {
                    if (!error) {
                        /*console.log(data);*/
                        resolve(data);
                    }
                    else {
                        reject(error);
                    }
                })
        })
    },

    queryOrderGoodsNum:function (params) {
        return new Promise(function (resolve, reject) {
            dbpool.connect("SELECT * FROM `orderdetail` WHERE orderId=?;",
            params,function (error, data) {
                    if (!error){
                        /*console.log(data);*/
                        resolve(data);
                    }
                    else {
                        reject(error);
                    }
                })
        })
    },

    updateQuantity:function (params) {
        var mostGoodsQuantity;
        return new Promise(function (resolve, reject) {
            dbpool.connect("select quantity from prospecs where ps_id=?",params[0],
            function (error1, data1) {
                mostGoodsQuantity=data1[0].quantity-params[1];
                console.log(mostGoodsQuantity);
                dbpool.connect("update prospecs set quantity=? where ps_id=?",
                [mostGoodsQuantity,params[0]],function (error2, data2) {
                    if (!error2){
                        resolve(data2)
                    }
                    else {
                        reject(error2);
                    }
                })
            })
        })
    },

    deleteAllShopingCart:function (params) {
        return new Promise(function (resolve, reject) {
            dbpool.connect("delete from cart where userId =?",
            params,function (error, data) {
                    if (!error){
                        resolve(data);
                    }
                    else {
                        reject(error);
                    }
                })
        })
    },
	 //家居商品列表
    grocery:function (params) {
        // console.log(params[0])
        return new Promise(function (resolve, reject) {
            if(params[1]==1){
                dbpool.connect("SELECT colorinfo.ci_color, product.proName, product.proPrice , product.proId, product.image FROM threepart.prospecs INNER JOIN threepart.colorinfo  ON (prospecs.ci_id = colorinfo.ci_id)INNER JOIN threepart.product  ON (prospecs.proId = product.proId)WHERE (product.sc_Id =9) GROUP BY product.proName;",
                    params[0],
                    function (error,data) {
                        if (!error){
                            resolve(data);
                        }
                        else {
                            reject(error);
                        }
                    })
            }else  if(params[1]==2){
                dbpool.connect("SELECT colorinfo.ci_color, product.proName, product.proPrice , product.proId, product.image FROM threepart.prospecs INNER JOIN threepart.colorinfo  ON (prospecs.ci_id = colorinfo.ci_id)INNER JOIN threepart.product  ON (prospecs.proId = product.proId)WHERE (product.sc_Id =10) GROUP BY product.proName;",
                    params[0],
                    function (error,data) {
                        if (!error){
                            resolve(data);
                        }
                        else {
                            reject(error);
                        }
                    })
            }else  if(params[1]==3){
                dbpool.connect("SELECT colorinfo.ci_color, product.proName, product.proPrice , product.proId, product.image FROM threepart.prospecs INNER JOIN threepart.colorinfo  ON (prospecs.ci_id = colorinfo.ci_id)INNER JOIN threepart.product  ON (prospecs.proId = product.proId)WHERE (product.sc_Id =11) GROUP BY product.proName;",
                    params[0],
                    function (error,data) {
                        if (!error){
                            resolve(data);
                        }
                        else {
                            reject(error);
                        }
                    })
            }else  if(params[1]==4){
                dbpool.connect("SELECT colorinfo.ci_color, product.proName, product.proPrice , product.proId, product.image FROM threepart.prospecs INNER JOIN threepart.colorinfo  ON (prospecs.ci_id = colorinfo.ci_id)INNER JOIN threepart.product  ON (prospecs.proId = product.proId)WHERE (product.sc_Id =12) GROUP BY product.proName;",
                    params[0],
                    function (error,data) {
                        if (!error){
                            resolve(data);
                        }
                        else {
                            reject(error);
                        }
                    })
            }else  if(params[1]==5){
                dbpool.connect("SELECT colorinfo.ci_color, product.proName, product.proPrice , product.proId, product.image FROM threepart.prospecs INNER JOIN threepart.colorinfo  ON (prospecs.ci_id = colorinfo.ci_id)INNER JOIN threepart.product  ON (prospecs.proId = product.proId)WHERE (product.sc_Id =13) GROUP BY product.proName;",
                    params[0],
                    function (error,data) {
                        if (!error){
                            resolve(data);
                        }
                        else {
                            reject(error);
                        }
                    })
            }else  if(params[1]==6){
                dbpool.connect("SELECT colorinfo.ci_color, product.proName, product.proPrice , product.proId, product.image FROM threepart.prospecs INNER JOIN threepart.colorinfo  ON (prospecs.ci_id = colorinfo.ci_id)INNER JOIN threepart.product  ON (prospecs.proId = product.proId)WHERE (product.sc_Id =14) GROUP BY product.proName;",
                    params[0],
                    function (error,data) {
                        if (!error){
                            resolve(data);
                        }
                        else {
                            reject(error);
                        }
                    })
            }else  if(params[1]==7){
                dbpool.connect("SELECT colorinfo.ci_color, product.proName, product.proPrice , product.proId, product.image FROM threepart.prospecs INNER JOIN threepart.colorinfo  ON (prospecs.ci_id = colorinfo.ci_id)INNER JOIN threepart.product  ON (prospecs.proId = product.proId)WHERE (product.sc_Id =15) GROUP BY product.proName;",
                    params[0],
                    function (error,data) {
                        if (!error){
                            resolve(data);
                        }
                        else {
                            reject(error);
                        }
                    })
            }else  if(params[1]==8){
                dbpool.connect("SELECT colorinfo.ci_color, product.proName, product.proPrice , product.proId, product.image FROM threepart.prospecs INNER JOIN threepart.colorinfo  ON (prospecs.ci_id = colorinfo.ci_id)INNER JOIN threepart.product  ON (prospecs.proId = product.proId)WHERE (product.sc_Id =16) GROUP BY product.proName;",
                    params[0],
                    function (error,data) {
                        if (!error){
                            resolve(data);
                        }
                        else {
                            reject(error);
                        }
                    })
            }else {
                dbpool.connect("SELECT colorinfo.ci_color, product.proName, product.proPrice , product.proId, product.image FROM threepart.prospecs INNER JOIN threepart.colorinfo  ON (prospecs.ci_id = colorinfo.ci_id)INNER JOIN threepart.product  ON (prospecs.proId = product.proId)WHERE (product.sc_Id between 9 and 16) GROUP BY product.proName;",
                    params[0],
                    function (error,data) {
                        if (!error){
                            resolve(data);
                        }
                        else {
                            reject(error);
                        }
                    })
            }

        })
    },
    //家居商品详情
    grocery_detail:function (params) {
        return new Promise(function (resolve, reject) {
            dbpool.connect("SELECT imageinfo.car_address,imageinfo.detail_address, product.sc_Id  ,product.details , product.materal , product.proName, product.image, product.place , product.proPrice, colorinfo.ci_color  , product.proId, product.image  FROM threepart.prospecs  INNER JOIN threepart.product  ON prospecs.proId = product.proId INNER JOIN threepart.imageinfo  ON  imageinfo.ps_id = prospecs.ps_id  INNER JOIN threepart.colorinfo  ON prospecs.ci_id = colorinfo.ci_id WHERE product.proId =?",
                params,
                function (error,data) {
                    if (!error){
                        resolve(data);
                        console.log("==========================contentdao data============================")
                        console.log(params)
                    }
                    else {
                        reject(error);
                    }
                })
        })
    },
    //更多商品
    grocery_goods_more:function (params) {
        return new Promise(function (resolve, reject) {
            dbpool.connect("SELECT colorinfo.ci_color, product.proName, product.proPrice , product.proId, product.image FROM threepart.prospecs INNER JOIN threepart.colorinfo  ON (prospecs.ci_id = colorinfo.ci_id)INNER JOIN threepart.product  ON (prospecs.proId = product.proId)WHERE (product.sc_Id between 9 and 16) GROUP BY product.proName limit ?",
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
module.exports=contentDao;
