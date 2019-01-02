const navDao = require("../dao/navDao");
const contentDao = require("../dao/contentDao");
const navController = {
    furniture:function (req,res) {
        navDao.queryFurnitureRecommend()
            .then(function (data) {
                res.render("furnitureRecommend", {
                    typeOne: req.query.typeOne,
                    FurnitureRecommend:JSON.stringify(data)
                });
            })

    },
	 grocery:function (req,res) {
        // console.log(req.query.type)
        contentDao.grocery([req.query.id]).then(function (data) {
            var data=JSON.stringify(data);
            res.render("grocery", {typeOne: req.query.typeOne,data:data});
            //console.log("======================================navcontroller========================================")
            //console.log(data)
        })
        // res.render("grocery", {typeOne: req.query.typeOne});
    },
    /*退出登录*/
    userLoginDown:function (req, res) {

        navDao.queryFurnitureRecommend()
            .then(function (data) {
                req.session.userName="";
                req.session.userId="";
                req.session.userPwd="";
                req.session.phone="";
                req.session.email="";
                res.redirect("Homecarousel.html");
                /*res.render("furnitureRecommend", {
                    typeOne: 1,
                    FurnitureRecommend:JSON.stringify(data)
                });*/
            })
    }
};
module.exports=navController;