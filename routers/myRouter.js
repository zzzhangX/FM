/*获取express模块*/
const express=require("express");
const path=require("path");
const dbpool=require("../config/dbpoolconfig");
//调用express对象提供的路由方法获取路由对象
const router=express.Router();
//将获取到的路由对象设置为公开状态，既可以在其他文件中使用该对象
module.exports=router;
/*移入导航模块*/
const navController = require("../controller/navController");
const contentController =require("../controller/contentController");
const userController=require("../controller/userController");
const lanmuController=require("../controller/lanmuController");

/*推荐商品*/

router.get("/lanmu.do",function(req,resp){
 resp.render("lanmu",{typeOne:req.query.typeOne});
});
//lanmu
router.post("/getHomeImg.do",lanmuController.getHomePic);
router.post("/getVisitImg.do",lanmuController.getVisitPic);
router.post("/getArtistImg.do",lanmuController.getArtistPic);
router.get("/moreHomeImg.do",lanmuController.getMoreHomePic);
router.get("/moreVisitImg.do",lanmuController.getMoreVisitPic);
router.get("/moreArtistImg.do",lanmuController.getMoreArtistPic);
router.get("/fnjihome-detail.do",lanmuController.getHomeById);
router.get("/fnjivisit-detail.do",lanmuController.getVisitById);
router.get("/fnjiartist-detail.do",lanmuController.getArtistById);
router.get("/grocery",navController.grocery);
router.get("/grocery_detail",contentController.grocery_detail);

// 微信测试：
// router.get("/manage/getHomeWx.do",(req,resp)=>{
//     dbpool.connect("SELECT * FROM t_homes ORDER BY h_id DESC LIMIT 6",
//         [],(err,data)=>{
//             //console.log(data);
//             resp.send(data)
//         })
// });

router.get("/furniture.do",navController.furniture);
/*初始详细信息*/
router.get("/details.do",contentController.details);
/*颜色、材质、规格查询*/
router.get("/innerQuery.do",contentController.innerQuery);
/*加入购物车*/
router.get("/addShopingCart.do",contentController.addShopingCart);
/*通过页面进入购物车页面*/
router.get("/shopingCart.do",contentController.shopingCart);
/*通过模态框进入购物车页面*/
router.get("/shopingCartByModal.do",contentController.shopingCartByModal);
/*删除购物车*/
router.get("/deleteShopingCart.do",contentController.deleteShopingCart);
/*修改购物车中商品的数量*/
router.get("/updateGoodsNum.do",contentController.updateGoodsNum);
/*产生订单*/
router.get("/createOrder.do",contentController.createOrder);
/*/!*进入订单页面*!/
router.get("/orderPage.do",contentController.orderPage);*/
/*删除地址*/
router.get("/deleteAddress.do",contentController.deleteAddress);
/*进入支付页面*/
router.get("/goBuy.do",contentController.goBuy);
/*确认支付*/
router.get("/surePay.do",contentController.surePay);

router.post("/surePayJudge.do",contentController.surePayJudge);

/*退出登录*/
router.get("/userLoginDown.do",navController.userLoginDown);



//用户登录
router.post("/login.do",userController.login);
//用户注册
router.post("/regiter.do",userController.regiter);
//修改用户信息
router.post("/edituser.do",userController.edituser);
/*进入个人信息页面*/
router.get("/showOrder.do",userController.showOrder);
//拦截个人中心页面
router.get("/personal.html",function(req,resp,next){
    if(req.session.userName==undefined){
        resp.redirect("/furniture.do?typeOne=1");
    }else {
        // resp.sendFile(path.join(__dirname,"../public/html/personal.html"));
        next();
    }
});
//获取用户全部地址信息
router.get("/getAllDddress.do",userController.getAllDddress);
//添加地址
router.post("/addDddress.do",userController.addDddress);
//获得单个地址信息
router.post("/editthisAddr.do",userController.editthisAddr);
//修改地址信息
router.post("/editadrress.do",userController.editadrress);
//删除地址信息
router.post("/delthisAddr.do",userController.delthisAddr);
//获取用户全部订单信息
router.get("/getAllorders.do",userController.getAllorders);
//获取用户订单详细信息
router.get("/orderPage.do",userController.orderPage);


/*进入VIP页面*/
router.get("/vip.do",contentController.vip);


//===================================后台管理========================================
//获取所有用户购物车信息
router.get("/manage_getAllcart.do",userController.getAllcart);
//获取购物车条数
router.get("/manage_getAllcartCount.do",userController.getAllcartCount);

//==============页脚跳转
router.get("/story.do",(req,resp)=>{
    resp.render("Story",{typeOne:4});
});
router.get("/physicalstore.do",(req,resp)=>{
    resp.render("physicalstore",{typeOne:4});
});
router.get("/mediaReports.do",(req,resp)=>{
    resp.render("mediaPeports",{typeOne:4});
});
router.get("/availablePosition.do",(req,resp)=>{
    resp.render("availablePosition",{typeOne:4});
});
router.get("/howToShop.do",(req,resp)=>{
    resp.render("howToShop",{typeOne:4});
});
router.get("/membership.do",(req,resp)=>{
    resp.render("membership",{typeOne:4});
});
router.get("/aboutDeliver.do",(req,resp)=>{
    resp.render("aboutDeliver",{typeOne:4});
});
router.get("/aboutDeliver1.do",(req,resp)=>{
    resp.render("aboutDeliver1",{typeOne:4});
});
router.get("/aboutDeliver2.do",(req,resp)=>{
    resp.render("aboutDeliver2",{typeOne:4});
});
router.get("/afterService.do",(req,resp)=>{
    resp.render("afterService",{typeOne:4});
});
router.get("/afterService1.do",(req,resp)=>{
    resp.render("afterService1",{typeOne:4});
})
//获取所有用户订单信息
router.get("/manage_getAllorderItem.do",userController.getAllorderItem);
//获取订单信息条数
router.get("/manage_getAllorderItemCount.do",userController.getAllorderItemCount);
//获取所有用户购物车信息
router.get("/manage_getAllorderDetails.do",userController.getAllorderDetails);
//获得一条订单的详细信息
router.get("/manage_getAllorderDetailsCount.do",userController.getAllorderDetailsCount);
//获取所有用户订单信息按照时间升序
router.get("/manage_getAllorderItemtimeAsc.do",userController.getAllorderItemtimeAsc);
//获取所有用户订单信息按照时间降序
router.get("/manage_getAllorderItemtimeDesc.do",userController.getAllorderItemtimeDesc);
//获取所有用户订单信息按照价格降序
router.get("/manage_getAllorderItempriceDesc.do",userController.getAllorderItempriceAsc);
//获取所有用户订单信息按照价格升序
router.get("/manage_getAllorderItempriceAsc.do",userController.getAllorderItempriceDesc);
//根据订单号查询订单信息
router.get("/manage_getorderItemById.do",userController.getorderItemById);
//根据订单id删除数据
router.get("/manage_delorderItemById.do",userController.delorderItemById);
//修改订单信息
router.get("/manage_editOrderItem.do",userController.editOrderItem);
//xiaoshou
router.get("/manage_xiaoshou",contentController.xiaoshou);
router.get("/manage_tu",contentController.getTu);
