/**
 * Created by zhang on 2018/12/5.
 */
const express=require("express");
const router=express.Router();
const path=require("path");

const adminController=require("../controller/adminController");
const upload=require("../config/uploadconfig");
// const upload=require("../config/lanmuuploadconfig");

router.get("/manage/admin_login",adminController.adminLogin);
//个人中心
router.get("/manage/personal.do",adminController.personal);
router.get("/manage/personalEdit.do",adminController.personalEdit);
router.get("/manage/editPwd.do",adminController.editPwd);
//管理员管理
router.get("/manage/getPageTotal.do",adminController.getTotalPage);
router.get("/manage/getAllAdmin.do",adminController.getAllAdmin);
router.get("/manage/insertAdmin.do",adminController.insertAdmin);
router.get("/manage/delAdmin.do",adminController.delAdmin);
router.get("/manage/openAdmin.do",adminController.openAdmin);
router.get("/manage/editAdmin.do",adminController.editAdmin);
router.get("/manage/searchAdmin.do",adminController.searchAdmin);
//栏目管理
router.get("/manage/getAllLanMu.do",adminController.getAllLanMu);
router.get("/manage/getLanMuPageTotal.do",adminController.getLanMuPageTotal);
router.get("/manage/searchHome.do",adminController.searchHome);
router.post("/manage/addHome.do",adminController.addHome);
router.get("/manage/delHome.do",adminController.delHome);
router.get("/manage/openHome.do",adminController.openHome);
router.post("/manage/editHome.do",adminController.editHome);
router.get("/manage/getDetailByIdPageTotal.do",adminController.getDetailByIdPageTotal);
router.get("/manage/getHomeById.do",adminController.getHomeById);
router.get("/manage/getHomeName.do",adminController.getHomeName);
router.get("/manage/delDetail.do",adminController.delDetail);
router.get("/manage/openDetail.do",adminController.openDetail);

router.post("/manage/uploadFile.do",adminController.uploadFile);
router.post("/manage/editUploadFile.do",adminController.editUploadFile);


module.exports=router;