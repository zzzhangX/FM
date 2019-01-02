/*获取express模块*/
const express=require("express");
const path=require("path");
//调用express对象提供的路由方法获取路由对象
const router=express.Router();
//将获取到的路由对象设置为公开状态，既可以在其他文件中使用该对象
module.exports=router;
/*引入商品模块*/
const goodsController = require("../controller/goodsController");
/*获取文件上传版块*/
const upload=require("../config/uploadconfig");

/*查询所有商品*/
router.get("/manage-queryGoods.do",goodsController.queryGoods);
/*下一页*/
router.get("/manage-nextGoods.do",goodsController.nextGoods);
/*查询商品*/
router.get("/manage-queryGoodsByInfo.do",goodsController.queryGoodsByInfo);
/*查询商品种类、颜色、材质、尺寸*/
router.get("/manage-queryTCWfInfo.do",goodsController.queryTCWfInfo);
/*上传图片*/
/*上传文件*/
//1.拦截路径 2.调用upload模块(服务器端) 3.分发controller(客户端和数据库)
//single(参数)：参数是html中file里面的name值,表示一次只上传一个文件
router.post("/manage-addGoods.do",upload.single("goodsImg"),goodsController.addGoods);

router.get("/manage-goodsIsExist.do",goodsController.goodsIsExist);

router.get("/manage-queryTypeByGoodsName.do",goodsController.queryTypeByGoodsName);

router.get("/manage-editGoodsQuery.do",goodsController.editGoodsQuery);

router.post("/manage-editGoods.do",upload.single("goodsImg"),goodsController.EditGoods);

router.get("/manage-deleteGoods.do",goodsController.deleteGoods);

router.get("/manage-editGoodsTotalQuery.do",goodsController.editGoodsTotalQuery);

router.get("/manage-editGoodsTotal.do",goodsController.editGoodsTotal);



router.get("/manage-querySaleData.do",goodsController.querySaleData);






