const dbpool = require("../config/dbpoolconfig");
const navDao = {
    queryFurnitureRecommend:function (params) {
        return new Promise(function (resolve, reject) {
            dbpool.connect("SELECT"+
                    "`product`.`proName`"+
                ", `product`.`proPrice`"+
                ", `product`.`image`"+
                ", `product`.`proId`"+
            "FROM"+
                "`threepart`.`product`"+
            "INNER JOIN `threepart`.`secondcategory`"+
            "ON (`product`.`sc_Id` = `secondcategory`.`sc_Id`)"+
            "INNER JOIN `threepart`.`category`"+
            "ON (`secondcategory`.`c_id` = `category`.`c_id`)"+
           "WHERE category.`c_id`=1 AND product.`recommend`=1 GROUP BY product.`proId`;",
                params,function (error, data) {
                    if (!error){
                        console.log(data);
                        resolve(data);
                    }
                    else {
                        reject(error);
                    }
                })
        })
    }
};
module.exports=navDao;