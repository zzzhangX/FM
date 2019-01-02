
const goodsDao = require("../dao/goodsDao");
const goodsController = {
    queryGoods:function (req, res) {
        goodsDao.queryGoods([parseInt(req.query.currentPage),parseInt(req.query.countPage)])
            .then(function (data1) {
                goodsDao.queryGoodsMount()
                    .then(function (data2) {
                        res.send({
                            allGoods:data1,
                            goodsMount:data2});
                    })
            })
    },
    nextGoods:function (req, res) {
        goodsDao.queryGoodsByInfo([parseInt(req.query.currentPage),parseInt(req.query.countPage),req.query.queryInfo.trim()])
            .then(function (data) {
                res.send(data);
            })
    },
    queryGoodsByInfo:function (req, res) {
        goodsDao.queryGoodsByInfo([parseInt(req.query.currentPage),parseInt(req.query.countPage),req.query.queryInfo.trim()])
            .then(function (data1) {
                /*res.send(data1);*/
                goodsDao.queryGoodsMountByInfo([req.query.queryInfo.trim()])
                    .then(function (data2) {
                        res.send({
                            goodsByInfo:data1,
                            goodsMountByInfo:data2,
                        });
                    })
            })
    },
    queryTCWfInfo:function (req,res) {
        goodsDao.queryTypeInfo()
            .then(function (data1) {
                goodsDao.queryColorInfo()
                    .then(function (data2) {
                        goodsDao.queryWoodInfo()
                            .then(function (data3) {
                                goodsDao.queryFvInfo()
                                    .then(function (data4) {
                                        res.send({
                                            typeInfo:data1,
                                            colorInfo:data2,
                                            woodInfo:data3,
                                            fvInfo:data4})
                                    })
                            })
                    })
            })



    },
    /*添加商品*/
    addGoods:function (req, res) {
        /*console.log(req.body);*/
        /*console.log(req.file.filename);*/
        /*req.file.filename，获取到的值是uploadconfig.js里面filename函数处理过后的文件名*/

        var pathname="images/goods/"+req.file.filename;
        /*console.log(pathname);*/
        /*var picName=(req.file.originalname).split(".")[0];*/
        goodsDao.queryTypeIdByTypeName([req.body.goodsType])
            .then(function (data1) {
                goodsDao.queryGoodsId([req.body.goodsName])
                    .then(function (data2) {
                        if (data2.length<=0){
                            goodsDao.insertProduct([data1[0].sc_Id,req.body.goodsName])
                             .then(function (data3) {
                                 goodsDao.queryGoodsId([req.body.goodsName])
                                     .then(function (data4) {
                                         /*console.log(data4);*/
                                         goodsDao.queryColorId([req.body.goodsColor])
                                             .then(function (data5) {
                                                 goodsDao.queryWoodId([req.body.goodsWood])
                                                     .then(function (data6) {
                                                        goodsDao.queryFvId([req.body.goodsFv])
                                                            .then(function (data7) {
                                                                var goodsColor;
                                                                var goodsWood;
                                                                var goodsFv;
                                                                if(data5.length<=0){
                                                                     goodsColor = null;
                                                                }
                                                                else {
                                                                    goodsColor=data5[0].ci_id;
                                                                }
                                                                if (data6.length<=0){
                                                                     goodsWood = null;
                                                                }
                                                                else {
                                                                    goodsWood = data6[0].w_id;
                                                                }
                                                                if (data7.length<=0){
                                                                     goodsFv = null;
                                                                }
                                                                else {
                                                                    goodsFv = data7[0].fv_id;
                                                                }
                                                                goodsDao.insertProspecs([goodsColor,goodsFv,goodsWood,data4[0].proId,req.body.goodsPrice,req.body.goodsQuantity,pathname,req.body.goodsDelivery])
                                                                    .then(function (data8) {
                                                                        goodsDao.queryPsId([data4[0].proId,goodsColor,goodsWood,goodsFv])
                                                                            .then(function (data9) {
                                                                                goodsDao.insertImageInfo([data9[0].ps_id,pathname])
                                                                                    .then(function (data10) {
                                                                                        goodsDao.updateProduct([req.body.goodsPrice,req.body.goodsQuantity,pathname,data4[0].proId])
                                                                                            .then(function (data11) {
                                                                                               goodsDao.queryGoodsByPsId([data9[0].ps_id])
                                                                                                   .then(function (data12) {
                                                                                                       res.send(data12);
                                                                                                   })
                                                                                            })
                                                                                    })
                                                                            })
                                                                    })
                                                            })
                                                     })
                                             })

                                     })
                             })
                        }
                        else {
                            goodsDao.queryColorId([req.body.goodsColor])
                                .then(function (data5) {
                                    goodsDao.queryWoodId([req.body.goodsWood])
                                        .then(function (data6) {
                                            goodsDao.queryFvId([req.body.goodsFv])
                                                .then(function (data7) {
                                                    var goodsColor;
                                                    var goodsWood;
                                                    var goodsFv;
                                                    if(data5.length<=0){
                                                        goodsColor = null;
                                                    }
                                                    else {
                                                        goodsColor=data5[0].ci_id;
                                                    }
                                                    if (data6.length<=0){
                                                        goodsWood = null;
                                                    }
                                                    else {
                                                        goodsWood = data6[0].w_id;
                                                    }
                                                    if (data7.length<=0){
                                                        goodsFv = null;
                                                    }
                                                    else {
                                                        goodsFv = data7[0].fv_id;
                                                    }
                                                    goodsDao.insertProspecs([goodsColor,goodsFv,goodsWood,data2[0].proId,req.body.goodsPrice,req.body.goodsQuantity,pathname,req.body.goodsDelivery])
                                                        .then(function (data8) {
                                                            goodsDao.queryPsId([data2[0].proId,goodsColor,goodsWood,goodsFv])
                                                                .then(function (data9) {
                                                                    goodsDao.insertImageInfo([data9[0].ps_id,pathname])
                                                                        .then(function (data10) {
                                                                           var goodsTotalQuantity;
                                                                            goodsTotalQuantity=parseInt(data2[0].quantity)+parseInt(req.body.goodsQuantity);
                                                                                /*console.log(goodsTotalQuantity);*/
                                                                            goodsDao.updateProductOnlyQuantity([goodsTotalQuantity,data2[0].proId])
                                                                                .then(function (data11) {
                                                                                    goodsDao.queryGoodsByPsId([data9[0].ps_id])
                                                                                        .then(function (data12) {
                                                                                            res.send(data12);
                                                                                        })
                                                                                })

                                                                        })
                                                                })
                                                        })
                                                })
                                        })
                                })


                        }
                    })

            })

    },
    goodsIsExist:function (req, res) {
        /*console.log(req.query);*/
        goodsDao.queryGoodsId([req.query.goodsName])
            .then(function (data4) {
                /*console.log(data4);*/
                var proID;
                if (data4.length<=0){
                    proID=0;
                }
                else {
                    proID = data4[0].proId;
                }
                goodsDao.queryColorId([req.query.goodsColor])
                    .then(function (data5) {
                        goodsDao.queryWoodId([req.query.goodsWood])
                            .then(function (data6) {
                                goodsDao.queryFvId([req.query.goodsFv])
                                    .then(function (data7) {
                                        var goodsColor;
                                        var goodsWood;
                                        var goodsFv;
                                        if(data5.length<=0){
                                            goodsColor = null;
                                        }
                                        else {
                                            goodsColor=data5[0].ci_id;
                                        }
                                        if (data6.length<=0){
                                            goodsWood = null;
                                        }
                                        else {
                                            goodsWood = data6[0].w_id;
                                        }
                                        if (data7.length<=0){
                                            goodsFv = null;
                                        }
                                        else {
                                            goodsFv = data7[0].fv_id;
                                        }
                                        goodsDao.queryPsId([proID,goodsColor,goodsWood,goodsFv])
                                            .then(function (data9) {
                                                /*console.log(data9);*/
                                                res.send(data9);
                                            })
                                    })
                            })
                    })

            })
    },
    queryTypeByGoodsName:function (req, res) {
        goodsDao.queryGoodsId([req.query.goodsName])
            .then(function (data1) {
                if (data1.length>0){
                    goodsDao.queryTypeNameByTypeId([data1[0].sc_Id])
                        .then(function (data2) {
                            res.send(data2);
                        })
                }
                else {
                    goodsDao.queryTypeInfo()
                        .then(function (data3) {
                            res.send(data3);
                        })
                }
            })
    },
    editGoodsQuery:function (req, res) {
        goodsDao.queryGoodsByPsId([req.query.goodsIdEdit])
            .then(function (data1) {
                goodsDao.queryTypeInfo()
                    .then(function (data2) {
                        goodsDao.queryColorInfo()
                            .then(function (data3) {
                                goodsDao.queryWoodInfo()
                                    .then(function (data4) {
                                        goodsDao.queryFvInfo()
                                            .then(function (data5) {
                                               res.send({
                                                   goodsInfoEdit:data1,
                                                   typeInfo:data2,
                                                   colorInfo:data3,
                                                   woodInfo:data4,
                                                   fvInfo:data5,
                                               })
                                            })
                                    })
                            })
                    })
            })
    },
    EditGoods:function (req, res) {
        console.log(req.body);
        var pathname="images/goods/"+req.file.filename;
        goodsDao.queryTypeIdByTypeName([req.body.goodsType])
            .then(function (data1) {
                goodsDao.queryGoodsId([req.body.goodsName])
                    .then(function (data2) {
                        if (data2.length<=0){

                            goodsDao.insertProduct([data1[0].sc_Id,req.body.goodsName])
                                .then(function (data3) {
                                    goodsDao.queryGoodsId([req.body.goodsName])
                                        .then(function (data4) {
                                            /*console.log(data4);*/
                                            goodsDao.queryColorId([req.body.goodsColor])
                                                .then(function (data5) {
                                                    goodsDao.queryWoodId([req.body.goodsWood])
                                                        .then(function (data6) {
                                                            goodsDao.queryFvId([req.body.goodsFv])
                                                                .then(function (data7) {
                                                                    var goodsColor;
                                                                    var goodsWood;
                                                                    var goodsFv;
                                                                    if(data5.length<=0){
                                                                        goodsColor = null;
                                                                    }
                                                                    else {
                                                                        goodsColor=data5[0].ci_id;
                                                                    }
                                                                    if (data6.length<=0){
                                                                        goodsWood = null;
                                                                    }
                                                                    else {
                                                                        goodsWood = data6[0].w_id;
                                                                    }
                                                                    if (data7.length<=0){
                                                                        goodsFv = null;
                                                                    }
                                                                    else {
                                                                        goodsFv = data7[0].fv_id;
                                                                    }
                                                                    goodsDao.queryProspecsByGoodsId([req.body.goodsId])
                                                                        .then(function (data8) {
                                                                            goodsDao.updateProspecs([goodsColor,goodsFv,goodsWood,data4[0].proId,req.body.goodsPrice,req.body.goodsQuantity,pathname,req.body.goodsDelivery,req.body.goodsId])
                                                                                .then(function (data9) {
                                                                                    goodsDao.queryGoodsLength([data8[0].proId])
                                                                                        .then(function (data10) {
                                                                                            if (data10.length<=0){
                                                                                                goodsDao.deleteGoodsByProId([data8[0].proId])
                                                                                                    .then(function (data11) {
                                                                                                        goodsDao.updateProduct([req.body.goodsPrice,req.body.goodsQuantity,pathname,data4[0].proId])
                                                                                                            .then(function (data12) {
                                                                                                                goodsDao.queryGoodsByPsId([req.body.goodsId])
                                                                                                                    .then(function (data13) {
                                                                                                                        goodsDao.updateImgInfo([req.body.goodsId,pathname])
                                                                                                                            .then(function (data14) {
                                                                                                                                res.send(data13);
                                                                                                                            });
                                                                                                                    })
                                                                                                            })
                                                                                                    })
                                                                                            }
                                                                                            else {
                                                                                                goodsDao.queryGoodsFirst([data8[0].proId])
                                                                                                    .then(function (data13) {
                                                                                                        goodsDao.queryGoodsByProId([data8[0].proId])
                                                                                                            .then(function (data14) {
                                                                                                                var totalQuantity;
                                                                                                                totalQuantity=parseInt(data14[0].quantity)-parseInt(data8[0].quantity);

                                                                                                                goodsDao.updateProduct([data13[0].ps_price,totalQuantity,data13[0].imgaddress,data8[0].proId])
                                                                                                                    .then(function (data15) {
                                                                                                                        goodsDao.updateProduct([req.body.goodsPrice,req.body.goodsQuantity,pathname,data4[0].proId])
                                                                                                                            .then(function (data16) {
                                                                                                                                goodsDao.queryGoodsByPsId([req.body.goodsId])
                                                                                                                                    .then(function (data17) {
                                                                                                                                        goodsDao.updateImgInfo([req.body.goodsId,pathname])
                                                                                                                                            .then(function (data18) {
                                                                                                                                                res.send(data17);
                                                                                                                                            });

                                                                                                                                    })
                                                                                                                            })
                                                                                                                    })
                                                                                                            })
                                                                                                    })
                                                                                            }
                                                                                        })
                                                                                })
                                                                        })
                                                                })
                                                        })
                                                })

                                        })
                                })
                        }
                        else {
                            goodsDao.queryColorId([req.body.goodsColor])
                                .then(function (data5) {
                                    goodsDao.queryWoodId([req.body.goodsWood])
                                        .then(function (data6) {
                                            goodsDao.queryFvId([req.body.goodsFv])
                                                .then(function (data7) {
                                                    var goodsColor;
                                                    var goodsWood;
                                                    var goodsFv;
                                                    if(data5.length<=0){
                                                        goodsColor = null;
                                                    }
                                                    else {
                                                        goodsColor=data5[0].ci_id;
                                                    }
                                                    if (data6.length<=0){
                                                        goodsWood = null;
                                                    }
                                                    else {
                                                        goodsWood = data6[0].w_id;
                                                    }
                                                    if (data7.length<=0){
                                                        goodsFv = null;
                                                    }
                                                    else {
                                                        goodsFv = data7[0].fv_id;
                                                    }
                                                    goodsDao.queryProspecsByGoodsId([req.body.goodsId])
                                                        .then(function (data8) {
                                                            goodsDao.updateProspecs([goodsColor,goodsFv,goodsWood,data2[0].proId,req.body.goodsPrice,req.body.goodsQuantity,pathname,req.body.goodsDelivery,req.body.goodsId])
                                                                .then(function (data9) {
                                                                    goodsDao.queryGoodsLength([data8[0].proId])
                                                                        .then(function (data10) {
                                                                            if (data10.length<=0){
                                                                                goodsDao.deleteGoodsByProId([data8[0].proId])
                                                                                    .then(function (data11) {
                                                                                        goodsDao.queryGoodsFirst([data2[0].proId])
                                                                                            .then(function (data12) {
                                                                                                goodsDao.queryGoodsByProId([data2[0].proId])
                                                                                                    .then(function (data13) {
                                                                                                        var totalQuantity;
                                                                                                        totalQuantity=parseInt(data13[0].quantity)+parseInt(req.body.goodsQuantity);
                                                                                                            goodsDao.updateProduct([data12[0].ps_price,totalQuantity,data12[0].imgaddress,data2[0].proId])
                                                                                                                .then(function (data14) {
                                                                                                                    goodsDao.queryGoodsByPsId([req.body.goodsId])
                                                                                                                        .then(function (data15) {
                                                                                                                            goodsDao.updateImgInfo([req.body.goodsId,pathname])
                                                                                                                                .then(function (data16) {
                                                                                                                                    res.send(data15);
                                                                                                                                })
                                                                                                                        })
                                                                                                                })

                                                                                                    })
                                                                                            })
                                                                                    })
                                                                            }
                                                                            else {
                                                                                goodsDao.queryGoodsFirst([data2[0].proId])
                                                                                    .then(function (data12) {
                                                                                        goodsDao.queryGoodsByProId([data2[0].proId])
                                                                                            .then(function (data13) {
                                                                                                var totalQuantity;
                                                                                                totalQuantity=parseInt(data13[0].quantity)+parseInt(req.body.goodsQuantity);
                                                                                                goodsDao.updateProduct([data12[0].ps_price,totalQuantity,data12[0].imgaddress,data2[0].proId])
                                                                                                    .then(function (data14) {
                                                                                                        goodsDao.queryGoodsFirst([data8[0].proId])
                                                                                                            .then(function (data15) {
                                                                                                                goodsDao.queryGoodsByProId([data8[0].proId])
                                                                                                                    .then(function (data16) {
                                                                                                                        var totalQuantityP;
                                                                                                                        totalQuantityP=parseInt(data16[0].quantity)-parseInt(data8[0].quantity);

                                                                                                                        goodsDao.updateProduct([data15[0].ps_price,totalQuantityP,data15[0].imgaddress,data8[0].proId])
                                                                                                                            .then(function (data17) {
                                                                                                                                goodsDao.queryGoodsByPsId([req.body.goodsId])
                                                                                                                                    .then(function (data18) {
                                                                                                                                        goodsDao.updateImgInfo([req.body.goodsId,pathname])
                                                                                                                                            .then(function (data19) {
                                                                                                                                                res.send(data18);
                                                                                                                                            })
                                                                                                                                    })
                                                                                                                            })
                                                                                                                    })
                                                                                                            })
                                                                                                    })

                                                                                            })
                                                                                    })
                                                                            }
                                                                        })
                                                                })
                                                        })
                                                })
                                        })
                                })
                        }
                    })
            })
    },
    deleteGoods:function (req, res) {
        /*console.log(req.query.goodsIdDelete);*/
        goodsDao.queryOrderByPsId([req.query.goodsIdDelete])
            .then(function (data) {
                if (data.length<=0){
                    goodsDao.queryCartByPsId([req.query.goodsIdDelete])
                        .then(function (data0) {
                            if (data0.length<=0){
                                goodsDao.deleteImgByGoodsId([req.query.goodsIdDelete])
                                    .then(function (data1) {
                                        goodsDao.queryGoodsByPsId([req.query.goodsIdDelete])
                                            .then(function (data2) {
                                                goodsDao.deleteProspecsByGoodsId([req.query.goodsIdDelete])
                                                    .then(function (data3) {
                                                        goodsDao.queryGoodsLength([data2[0].proId])
                                                            .then(function (data4) {
                                                                if (data4.length<=0){
                                                                    goodsDao.deleteGoodsByProId([[data2[0].proId]])
                                                                        .then(function (data5) {
                                                                            goodsDao.queryGoodsMount()
                                                                                .then(function (data6) {
                                                                                    var currentPage = req.query.currentPage;
                                                                                    var totalPage;
                                                                                    totalPage=Math.ceil(parseInt(data6[0].goodsMount)/parseInt(currentPage));
                                                                                    /*console.log(currentPage);
                                                                                     console.log(totalPage);*/
                                                                                    if (currentPage>=totalPage){
                                                                                        currentPage=totalPage;
                                                                                    }
                                                                                    goodsDao.queryGoods([parseInt(currentPage),parseInt(req.query.countPage)])
                                                                                        .then(function (data7) {
                                                                                            /* console.log(data0[0].quantity);*/
                                                                                            res.send({
                                                                                                allGoods:data7,
                                                                                                goodsMount:data6});
                                                                                        })
                                                                                })
                                                                        })
                                                                }
                                                                else {
                                                                    goodsDao.queryGoodsFirst([data2[0].proId])
                                                                        .then(function (data15) {
                                                                            goodsDao.queryGoodsByProId([data2[0].proId])
                                                                                .then(function (data16) {
                                                                                    var totalQuantityS;
                                                                                    totalQuantityS=parseInt(data16[0].quantity)-parseInt(data2[0].quantity);

                                                                                    goodsDao.updateProduct([data15[0].ps_price,totalQuantityS,data15[0].imgaddress,data2[0].proId])
                                                                                        .then(function (data17) {
                                                                                            goodsDao.queryGoodsMount()
                                                                                                .then(function (data6) {
                                                                                                    var currentPage = req.query.currentPage;
                                                                                                    var totalPage;
                                                                                                    totalPage=Math.ceil(parseInt(data6[0].goodsMount)/parseInt(currentPage));
                                                                                                    /*console.log(currentPage);
                                                                                                     console.log(totalPage);*/
                                                                                                    if (currentPage>=totalPage){
                                                                                                        currentPage=totalPage;
                                                                                                    }
                                                                                                    goodsDao.queryGoods([parseInt(currentPage),parseInt(req.query.countPage)])
                                                                                                        .then(function (data7) {
                                                                                                            /* console.log(data0[0].quantity);*/
                                                                                                            res.send({
                                                                                                                allGoods:data7,
                                                                                                                goodsMount:data6});
                                                                                                        })
                                                                                                })
                                                                                        })
                                                                                })
                                                                        })

                                                                }
                                                            })
                                                    })
                                            })
                                    })
                            }
                            else {
                                res.send("该商品不能删除");
                            }
                        })
                }
                else {
                    res.send("该商品不能删除");
                }

            })


    },
    editGoodsTotalQuery:function (req,res){
        goodsDao.queryAllGoodsName()
            .then(function (data1) {
                goodsDao.queryTypeInfo()
                    .then(function (data2) {
                        res.send({
                            allGoodsName:data1,
                            typeInfo:data2
                        })
                    })
            })
    },
    editGoodsTotal:function (req, res) {
        /*console.log(req.query);*/
        goodsDao.queryGoodsId([req.query.goodsNameEditTotal])
            .then(function (data1) {
                goodsDao.queryTypeIdByTypeName([req.query.goodsTypeEditTotal])
                    .then(function (data2) {
                        goodsDao.updateProductType([data2[0].sc_Id,data1[0].proId])
                            .then(function (data3) {
                                goodsDao.queryGoods([parseInt(req.query.currentPage),parseInt(req.query.countPage)])
                                    .then(function (data4) {
                                        goodsDao.queryGoodsMount()
                                            .then(function (data5) {
                                                res.send({
                                                    allGoods:data4,
                                                    goodsMount:data5});
                                            })
                                    })
                            })
                    })
            })
    },

    querySaleData:function (req, res) {
        goodsDao.queryYearTotal()
            .then(function (data1) {
                goodsDao.queryMonthTotal([req.query.year])
                    .then(function (data2) {
                        goodsDao.queryQuarterTotal([req.query.year])
                            .then(function (data3) {
                                goodsDao.queryUserTotal()
                                    .then(function (data4) {
                                        goodsDao.queryNormalVip()
                                            .then(function (data5) {
                                                goodsDao.querySilverVip()
                                                    .then(function (data6) {
                                                        goodsDao.queryGoldVip()
                                                            .then(function (data7) {
                                                                goodsDao.queryMasonryVip()
                                                                    .then(function (data8) {
                                                                        goodsDao.queryOrderUserTotal()
                                                                            .then(function (data9) {
                                                                                var vip=[
                                                                                    {value:parseInt(data5[0].vipMount)+(parseInt((data4[0].userTotal-parseInt((data9[0].userorderTotal))))),name:"普通会员"},
                                                                                    {value:data6[0].vipMount,name:"白银会员"},
                                                                                    {value:data7[0].vipMount,name:"黄金会员"},
                                                                                    {value:data8[0].vipMount,name:"砖石会员"},
                                                                                ];
                                                                                res.send({
                                                                                    yearTotal:data1,
                                                                                    monthTotal:data2,
                                                                                    quarterTotal:data3,
                                                                                    vip:vip
                                                                                })
                                                                            })
                                                                    })
                                                            })
                                                    })
                                            })
                                    })
                            })

                    })
               /* var yearArray=[];
                for(var i=0;i<data1.length;i++){
                    yearArray.push(data1[i].shiJian.split("-")[0]);
                }
                for(var i =0;i<yearArray.length;i++){
                    for(var j =i+1;j<yearArray.length;j++){
                        if (yearArray[i]==yearArray[j]){
                            yearArray.splice(j,1);
                            j--;
                        }
                    }
                }
                var yearDataTotal=[];
                var yearDataSingle=[];
                for (var i=0;i<yearArray.length;i++){
                    (function (i) {
                        goodsDao.queryYearData([yearArray[i]])
                            .then(function (data2) {
                                yearDataSingle.push(data2);
                                if (i==2){
                                    res.send({
                                        yearArray:yearArray,
                                        yearDataSingle:yearDataSingle
                                    });
                                }
                               /!* console.log(yearDataSingle);*!/
                            });
                    })(i);
                }*/

                /*console.log(yearDataTotal);*/
            })
    },

};
module.exports=goodsController;