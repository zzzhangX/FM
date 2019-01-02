/*获取express模块*/
const express=require("express");
const path=require("path");
//调用express对象提供的路由方法获取路由对象
const router=express.Router();
//将获取到的路由对象设置为公开状态，既可以在其他文件中使用该对象
module.exports=router;
/*引入商品模块*/
const formatController = require("../controller/formatController");
/*获取文件上传版块*/
const upload=require("../config/uploadconfig");

router.get("/manage-queryTCWFInfoG.do",formatController.queryTCWFInfoG);

router.get("/manage-addColor.do",formatController.addColor);

router.get("/manage-deleteColor.do",formatController.deleteColor);

router.get("/manage-colorEditQuery.do",formatController.colorEditQuery);

router.get("/manage-colorEdit.do",formatController.colorEdit);

router.get("/manage-colorEditTrue.do",formatController.colorEditTrue);

