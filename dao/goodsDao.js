/*获取配置文件*/
const dbpool = require("../config/dbpoolconfig");
const goodsDao = {

    queryGoods:function (params) {
        return new Promise(function (resolve, reject) {
            var startNum = parseInt(params[0]-1)*parseInt(params[1]);
            dbpool.connect("SELECT"+
                    "`prospecs`.`ps_id`"+
                ", `secondcategory`.`sc_name`"+
                ",`prospecs`.`ps_price`"+
                ", `product`.`proName`"+
                ", `product`.`proId`"+
                ", `woodinfo`.`w_wood`"+
                ", `formatvalue`.`fv_name`"+
                ", `colorinfo`.`ci_color`"+
                ", `product`.`proPrice`"+
                ", `prospecs`.`quantity`"+
                ", `product`.`place`"+
                ", `prospecs`.`Delivery`"+
                ", `prospecs`.`weight`"+
                ", `prospecs`.`imgaddress`"+
            "FROM"+
                "`threepart`.`prospecs`"+
            "INNER JOIN `threepart`.`product`"+
            "ON (`prospecs`.`proId` = `product`.`proId`)"+
                "INNER JOIN `threepart`.`secondcategory`"+
            "ON (`product`.`sc_Id` = `secondcategory`.`sc_Id`)"+
            "LEFT OUTER JOIN `threepart`.`woodinfo`"+
            "ON (`prospecs`.`w_id` = `woodinfo`.`w_id`)"+
            "LEFT OUTER JOIN `threepart`.`formatvalue`"+
            "ON (`prospecs`.`fv_id` = `formatvalue`.`fv_id`)"+
            "LEFT OUTER JOIN `threepart`.`colorinfo`"+
            "ON (`prospecs`.`ci_id` = `colorinfo`.`ci_id`) order by `prospecs`.`ps_id` limit ?,? ;"
                ,[startNum,params[1]],function (error, data) {
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
    queryGoodsMount:function (params) {
        return new Promise(function (resolve, reject) {
            dbpool.connect("SELECT COUNT(*) as goodsMount FROM `prospecs`",params,function (error,data) {
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
    queryGoodsByInfo:function (params) {
        return new Promise(function (resolve, reject) {
            /*console.log(typeof params);
            console.log(params);*/
            /*console.log(params);*/
            var startNum = parseInt(params[0]-1)*parseInt(params[1]);
            var queryInfo = "%"+params[2]+"%";
           /* console.log(queryInfo);*/
            dbpool.connect("SELECT"+
                "`prospecs`.`ps_id`"+
                ", `secondcategory`.`sc_name`"+
                ",`prospecs`.`ps_price`"+
                ", `product`.`proName`"+
                ", `product`.`proId`"+
                ", `woodinfo`.`w_wood`"+
                ", `formatvalue`.`fv_name`"+
                ", `colorinfo`.`ci_color`"+
                ", `product`.`proPrice`"+
                ", `prospecs`.`quantity`"+
                ", `product`.`place`"+
                ", `prospecs`.`Delivery`"+
                ", `prospecs`.`weight`"+
                ", `prospecs`.`imgaddress`"+
                "FROM"+
                "`threepart`.`prospecs`"+
                "INNER JOIN `threepart`.`product`"+
                "ON (`prospecs`.`proId` = `product`.`proId`)"+
                "INNER JOIN `threepart`.`secondcategory`"+
                "ON (`product`.`sc_Id` = `secondcategory`.`sc_Id`)"+
                "LEFT OUTER JOIN `threepart`.`woodinfo`"+
                "ON (`prospecs`.`w_id` = `woodinfo`.`w_id`)"+
                "LEFT OUTER JOIN `threepart`.`formatvalue`"+
                "ON (`prospecs`.`fv_id` = `formatvalue`.`fv_id`)"+
                "LEFT OUTER JOIN `threepart`.`colorinfo`"+
                "ON (`prospecs`.`ci_id` = `colorinfo`.`ci_id`) " +
                    "where `product`.`proName` like ? order by `prospecs`.`ps_id` limit ?,?;"
                ,[queryInfo,startNum,params[1]],function (error, data) {
                if (!error){
                    /*console.log(data);*/
                    resolve(data);
                }
                else {
                    console.log(error);
                    reject(error);
                }
            })
        })
    },
    queryGoodsMountByInfo:function (params) {
        return new Promise(function (resolve, reject) {
            var queryInfo = "%"+params[0]+"%";
            dbpool.connect("SELECT "+
            "COUNT(*) as goodsMountByInfo "+
            "FROM"+
                "`threepart`.`prospecs`"+
            "INNER JOIN `threepart`.`product`"+
            "ON (`prospecs`.`proId` = `product`.`proId`)"+
            "LEFT OUTER JOIN `threepart`.`woodinfo`"+
            "ON (`prospecs`.`w_id` = `woodinfo`.`w_id`)"+
            "LEFT OUTER JOIN `threepart`.`formatvalue`"+
            "ON (`prospecs`.`fv_id` = `formatvalue`.`fv_id`)"+
            "LEFT OUTER JOIN `threepart`.`colorinfo`"+
            "ON (`prospecs`.`ci_id` = `colorinfo`.`ci_id`)"+
            "WHERE `product`.`proName` LIKE ?;", queryInfo, function (error, data) {
                if (!error){
                    console.log(data);
                    resolve(data);
                }
                else {
                    console.log(error);
                    reject(error);
                }
            })
        })

    },
    queryTypeInfo:function (params) {
        return new Promise(function (resolve, reject) {
            dbpool.connect("SELECT * FROM `secondcategory`",params,function (error, data) {
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
            dbpool.connect("SELECT	* FROM `colorinfo`",params,function (error, data) {
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
            dbpool.connect("SELECT	* FROM `woodinfo`",params,function (error, data) {
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
            dbpool.connect("SELECT	* FROM `formatvalue`",params,function (error, data) {
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
    queryTypeIdByTypeName:function (params) {
        return new Promise(function (resolve, reject) {
            dbpool.connect("SELECT sc_Id FROM `secondcategory` WHERE sc_name=?", params,
                function(error,data){
                    if (!error){
                        resolve(data);
                    }
                    else{
                        reject(error);
                    }
                })
        })

    },
    queryGoodsId:function (params) {
      return new Promise(function (resolve, reject) {
          dbpool.connect("select * from product where proName=?",params,function (error, data) {
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
    insertProduct:function (params) {
        /*console.log(params[0].sc_Id);*/
        var details = ["在居住空间有限的时代，人们对娱乐的需求是不变的，设计一款美观麻将桌的同时，加入用餐功能，实现有限空间里的功能最大化。","餐桌、麻将桌集于一体","两用麻将桌是一款集合用餐、打麻将两用的桌子，桌面为双面设计，可以取下并且翻转，完成打麻将与用餐的双重用途。桌面板与桌体间内置磁吸，贴合自然且具有质感。麻将桌面布采用意大利Fenice羊毛布，触摸舒适，用餐面选择白色卡拉卡塔石烧纹磨砂面板，纹理自然宛如水墨，增添空间高级感。","自带储物功能","桌体四面各有一枚抽屉，用来收纳临时存放的小型物件，桌面取下后，内部设有隔板分层，可用于收纳麻将或其他物件，是一款自带多种储物功能的两用桌。","蘑菇形实木桌体设计","麻将桌底座以最简洁的上小下大的形式满足其站立功能，配合内置配重使其结构更加稳固。实木底座与桌面框架采用同样的设计语言，工艺缝细节增添视觉灵动性与呼吸感，整体和谐统一。"]
        params.push(JSON.stringify(details));
        return new Promise(function (resolve, reject) {
            /*console.log(params);*/
            dbpool.connect("insert into product values(null,?,?,null,null,null,null,null,null,null,?,'北京',null)",params,function (error, data) {
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
    queryColorId:function (params) {
        return new Promise(function (resolve, reject) {
            dbpool.connect("select * from colorinfo where ci_color=?",params,function (error, data) {
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
    queryWoodId:function (params) {
        return new Promise(function (resolve, reject) {
            dbpool.connect("select * from woodinfo where w_wood=?",params,function (error, data) {
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
    queryFvId:function (params) {
        return new Promise(function (resolve, reject) {
            dbpool.connect("select * from formatvalue where fv_name=?",params,function (error, data) {
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
    insertProspecs:function (params) {
        /*console.log(params);*/
        return new Promise(function (resolve, reject) {
            dbpool.connect("insert into prospecs values(null,?,?,?,?,?,?,?,20,?) ",params,function (error, data) {
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
    queryPsId:function (params) {
        // console.log(params);
        var sql = "select * from prospecs where proId=? ";
        if (params[1]==null){
            sql+="and ci_id is ? "
        }
        else {
            sql+="and ci_id = ? "
        }
        if (params[2]==null){
            sql+="and w_id is ? "
        }
        else {
            sql+="and w_id = ? "
        }
        if (params[3]==null){
            sql+="and fv_id is ? "
        }
        else {
            sql+="and fv_id = ? "
        }
           /*console.log(sql);*/
            return new Promise(function (resolve, reject) {
            dbpool.connect(sql,params,function (error, data) {
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
    insertImageInfo:function (params) {
        var car_address = ["2-5-1.jpg","2-5-2.png","2-5-3.png","2-5-4.png","2-5-5.jpg"];
        var detail_address = ["2-5-6.png","2-5-7.png","2-5-8.png","2-5-9.jpg","2-5-10.jpg","2-5-11.jpg","2-5-12.jpg","2-5-13.jpg","2-5-14.jpg","2-5-15.jpg","2-5-16.jpg"];
        car_address[0]=params[1].split("images/")[1];
        return new Promise(function (resolve, reject) {
            dbpool.connect("insert into imageinfo values(null,?,?,?)",[params[0],JSON.stringify(car_address),JSON.stringify(detail_address)],function (error, data) {
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
    updateImgInfo:function (params) {
        var car_address = ["2-5-1.jpg","2-5-2.png","2-5-3.png","2-5-4.png","2-5-5.jpg"];
        var detail_address = ["2-5-6.png","2-5-7.png","2-5-8.png","2-5-9.jpg","2-5-10.jpg","2-5-11.jpg","2-5-12.jpg","2-5-13.jpg","2-5-14.jpg","2-5-15.jpg","2-5-16.jpg"];
        car_address[0]=params[1].split("images/")[1];
        return new Promise(function (resolve, reject) {
            dbpool.connect("update imageinfo set car_address=?,detail_address=? where ps_id=?",[JSON.stringify(car_address),JSON.stringify(detail_address),params[0]],function (error, data) {
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
    updateProduct:function (params) {
        return new Promise(function (resolve, reject) {
            dbpool.connect("update product set proPrice=?,quantity=?,image=? where proId=?",params,function (error, data) {
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
    queryGoodsByPsId:function (params) {
        return new Promise(function (resolve, reject) {
            dbpool.connect("SELECT"+
                "`prospecs`.`ps_id`"+
                ", `secondcategory`.`sc_name`"+
                ",`prospecs`.`ps_price`"+
                ", `product`.`proName`"+
                ", `product`.`proId`"+
                ", `woodinfo`.`w_wood`"+
                ", `formatvalue`.`fv_name`"+
                ", `colorinfo`.`ci_color`"+
                ", `product`.`proPrice`"+
                ", `prospecs`.`quantity`"+
                ", `product`.`place`"+
                ", `prospecs`.`Delivery`"+
                ", `prospecs`.`weight`"+
                ", `prospecs`.`imgaddress`"+
                "FROM"+
                "`threepart`.`prospecs`"+
                "INNER JOIN `threepart`.`product`"+
                "ON (`prospecs`.`proId` = `product`.`proId`)"+
                "INNER JOIN `threepart`.`secondcategory`"+
                "ON (`product`.`sc_Id` = `secondcategory`.`sc_Id`)"+
                "LEFT OUTER JOIN `threepart`.`woodinfo`"+
                "ON (`prospecs`.`w_id` = `woodinfo`.`w_id`)"+
                "LEFT OUTER JOIN `threepart`.`formatvalue`"+
                "ON (`prospecs`.`fv_id` = `formatvalue`.`fv_id`)"+
                "LEFT OUTER JOIN `threepart`.`colorinfo`"+
                "ON (`prospecs`.`ci_id` = `colorinfo`.`ci_id`) where prospecs.ps_id=?;",params,function (error, data) {
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
    queryTypeNameByTypeId:function (params) {
        /*console.log(params);*/
        return new Promise(function (resolve, reject) {
            dbpool.connect("SELECT sc_name FROM `secondcategory` WHERE sc_Id=?", params,
                function(error,data){
                    if (!error){
                        resolve(data);
                    }
                    else{
                        reject(error);
                    }
                })
        })

    },
    queryProspecsByGoodsId:function (params) {
        return new Promise(function (resolve, reject) {
            dbpool.connect("select * from prospecs where ps_id=?", params,
                function(error,data){
                    if (!error){
                        resolve(data);
                    }
                    else{
                        reject(error);
                    }
                })
        })
    },
    updateProspecs:function (params) {
        return new Promise(function (resolve, reject) {
            dbpool.connect("update prospecs set ci_id=?,fv_id=?,w_id=?,proId=?,ps_price=?,quantity=?,imgaddress=?,delivery=? where ps_id=?", params,
                function(error,data){
                    if (!error){
                        resolve(data);
                    }
                    else{
                        reject(error);
                    }
                })
        })
    },
    queryGoodsLength:function (params) {
        return new Promise(function (resolve, reject) {
            dbpool.connect("select * from prospecs where proId=?", params,
                function(error,data){
                    if (!error){
                        resolve(data);
                    }
                    else{
                        reject(error);
                    }
                })
        })
    },
    deleteGoodsByProId:function (params) {
        return new Promise(function (resolve, reject) {
            dbpool.connect("delete from product where proId=?", params,
                function(error,data){
                    if (!error){
                        resolve(data);
                    }
                    else{
                        reject(error);
                    }
                })
        })
    },
    queryGoodsFirst:function (params) {
        return new Promise(function (resolve, reject) {
            dbpool.connect("SELECT * FROM prospecs WHERE proId=? ORDER BY ps_id LIMIT 1", params,
                function(error,data){
                    if (!error){
                        resolve(data);
                    }
                    else{
                        reject(error);
                    }
                })
        })
    },
    queryGoodsByProId:function (params) {
        return new Promise(function (resolve, reject) {
            dbpool.connect("SELECT * FROM product WHERE proId=?", params,
                function(error,data){
                    if (!error){
                        resolve(data);
                    }
                    else{
                        reject(error);
                    }
                })
        })
    },
    updateProductOnlyQuantity:function (params) {
        return new Promise(function (resolve, reject) {
            dbpool.connect("update product set quantity=? where proId=?", params,
                function(error,data){
                    if (!error){
                        resolve(data);
                    }
                    else{
                        reject(error);
                    }
                })
        })
    },
    queryOrderByPsId:function (params) {
        return new Promise(function (resolve, reject) {
            dbpool.connect("SELECT * FROM `orderdetail` WHERE ps_id=?", params,
                function(error,data){
                    if (!error){
                        resolve(data);
                    }
                    else{
                        reject(error);
                    }
                })
        })
    },
    queryCartByPsId:function (params) {
        return new Promise(function (resolve, reject) {
            dbpool.connect("SELECT * FROM `cart` WHERE ps_id=?", params,
                function(error,data){
                    if (!error){
                        resolve(data);
                    }
                    else{
                        reject(error);
                    }
                })
        })
    },
    deleteImgByGoodsId:function (params) {
        return new Promise(function (resolve, reject) {
            dbpool.connect("delete from imageinfo where ps_id=?", params,
                function(error,data){
                    if (!error){
                        resolve(data);
                    }
                    else{
                        reject(error);
                    }
                })
        })
    },
    deleteProspecsByGoodsId:function (params) {
        return new Promise(function (resolve, reject) {
            dbpool.connect("delete from prospecs where ps_id=?", params,
                function(error,data){
                    if (!error){
                        resolve(data);
                    }
                    else{
                        reject(error);
                    }
                })
        })
    },
    queryAllGoodsName:function (params) {
        return new Promise(function (resolve, reject) {
            dbpool.connect("select * from product", params,
                function(error,data){
                    if (!error){
                        resolve(data);
                    }
                    else{
                        reject(error);
                    }
                })
        })
    },
    updateProductType:function (params) {
        return new Promise(function (resolve, reject) {
            dbpool.connect("update product set sc_Id=? where proId=?", params,
                function(error,data){
                    if (!error){
                        resolve(data);
                    }
                    else{
                        reject(error);
                    }
                })
        })
    },
    queryYearTotal:function (params) {
        return new Promise(function (resolve, reject) {
            dbpool.connect("SELECT YEAR(shiJian) AS YEAR,SUM(danJia*shu) AS yearTotal FROM dindan where os_id=4 GROUP BY YEAR(shiJian)", params,
                function(error,data){
                    if (!error){
                        resolve(data);
                    }
                    else{
                        reject(error);
                    }
                })
        })
    },
    queryMonthTotal:function (params) {
        var sql;
        sql=params[0]+"-%-%";
        return new Promise(function (resolve, reject) {
            dbpool.connect("SELECT MONTH(shiJian) AS MONTH,SUM(danJia*shu) AS monthTotal FROM dindan WHERE shiJian LIKE ? AND os_id=4 GROUP BY MONTH(shiJian)",sql,
                function(error,data){
                    if (!error){
                        resolve(data);
                    }
                    else{
                        reject(error);
                    }
                })
        })
    },
    queryQuarterTotal:function (params) {
        var sql;
        sql=params[0]+"-%-%";
        return new Promise(function (resolve, reject) {
            dbpool.connect("SELECT QUARTER(shiJian) AS season,SUM(danJia*shu) AS seasonTotal FROM dindan WHERE shiJian LIKE ? AND os_id=4 GROUP BY QUARTER(shiJian)",sql,
                function(error,data){
                    if (!error){
                        resolve(data);
                    }
                    else{
                        reject(error);
                    }
                })
        })
    },
    queryYearData:function (params) {
        return new Promise(function (resolve, reject) {
            var sql = params[0]+"-%-%";
            /*console.log(sql);*/
            dbpool.connect("select shu,danJia from dindan where os_id=4 and shiJian like ?", sql,
                function(error,data){
                    if (!error){
                        resolve(data);
                    }
                    else{
                        reject(error);
                    }
                });

        })
    },
    queryUserTotal:function (params) {
        return new Promise(function (resolve, reject) {
            dbpool.connect("SELECT COUNT(*) AS userTotal FROM USER",params,
                function(error,data){
                    if (!error){
                        resolve(data);
                    }
                    else{
                        reject(error);
                    }
                });

        })
    },
    queryOrderUserTotal:function (params) {
        return new Promise(function (resolve, reject) {
            dbpool.connect("SELECT COUNT(*) AS userorderTotal FROM (SELECT DISTINCT user_id FROM dindan) AS n",params,
                function(error,data){
                    if (!error){
                        resolve(data);
                    }
                    else{
                        reject(error);
                    }
                });

        })
    },
    queryNormalVip:function (params) {
        return new Promise(function (resolve, reject) {
            dbpool.connect("SELECT COUNT(*) AS vipMount FROM (SELECT user_id,SUM(shu*danJia) AS t FROM dindan GROUP BY user_id HAVING t<1000) AS n;",params,
                function(error,data){
                    if (!error){
                        resolve(data);
                    }
                    else{
                        reject(error);
                    }
                });

        })
    },
    querySilverVip:function (params) {
        return new Promise(function (resolve, reject) {
            dbpool.connect("SELECT COUNT(*) AS vipMount FROM (SELECT user_id,SUM(shu*danJia) AS t FROM dindan GROUP BY user_id HAVING t>=1000 AND t<5000) AS n;",params,
                function(error,data){
                    if (!error){
                        resolve(data);
                    }
                    else{
                        reject(error);
                    }
                });

        })
    },
    queryGoldVip:function (params) {
        return new Promise(function (resolve, reject) {
            dbpool.connect("SELECT COUNT(*) AS vipMount FROM (SELECT user_id,SUM(shu*danJia) AS t FROM dindan GROUP BY user_id HAVING t>=5000 AND t<20000) AS n;",params,
                function(error,data){
                    if (!error){
                        resolve(data);
                    }
                    else{
                        reject(error);
                    }
                });

        })
    },
    queryMasonryVip:function (params) {
        return new Promise(function (resolve, reject) {
            dbpool.connect("SELECT COUNT(*) AS vipMount FROM (SELECT user_id,SUM(shu*danJia) AS t FROM dindan GROUP BY user_id HAVING t>=20000) AS n;",params,
                function(error,data){
                    if (!error){
                        resolve(data);
                    }
                    else{
                        reject(error);
                    }
                });

        })
    },
};
module.exports=goodsDao;
