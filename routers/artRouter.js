/**
 * Created by xml on 2018/11/7.
 */

const express=require("express");
const router=express.Router();

//引入控制层
const controller=require("../controller/artController");

router.get("/art.do",controller.art);
router.get("/news.do",controller.news);

router.get("/getNewArtist.do",controller.getNewArtist);
router.get("/getAllArtist.do",controller.getAllArtist);
router.get("/getPartExhibit.do",controller.getPartExhibit);
router.get("/getOneBrief.do",controller.getOneBrief);
router.get("/getOneTalk.do",controller.getOneTalk);//获取一个
router.get("/getOneTalk1.do",controller.getOneTalk1);//获取一个
router.get("/getInterviewPhoto.do",controller.getInterviewPhoto);//获取一个
router.get("/getOneExhibit.do",controller.getOneExhibit);
router.get("/getOneExhibit1.do",controller.getOneExhibit1);
router.get("/getExhibitPhoto.do",controller.getExhibitPhoto);
router.get("/getOneWorks.do",controller.getOneWorks);
router.get("/getAllWorks.do",controller.getAllWorks);
router.get("/getAllNews.do",controller.getAllNews);



//后台users管理模块
router.get("/manage/getOneUsersByName.do",controller.getOneUsersByName);
router.get("/manage/getOneUsersAddressByName.do",controller.getOneUsersAddressByName);

router.get("/manage/getAllUserCountByName.do",controller.getAllUserCountByName);
router.get("/manage/getAllUserAddressCountByName.do",controller.getAllUserAddressCountByName);

router.get("/manage/addNewUser.do",controller.addNewUser);
router.get("/manage/addNewUserAddress.do",controller.addNewUserAddress);
router.get("/manage/deleteOneUser.do",controller.deleteOneUser);
router.get("/manage/deleteOneUserAddress.do",controller.deleteOneUserAddress);
//修改用户
router.get("/manage/selectOneUser.do",controller.selectOneUser);
router.get("/manage/selectOneUserAddress.do",controller.selectOneUserAddress);
router.get("/manage/updateUser.do",controller.updateUser);
router.get("/manage/UpdateUserAddress.do",controller.UpdateUserAddress);


router.get("/manage/getAllProvince.do",controller.getAllProvince);
router.get("/manage/getAllCity.do",controller.getAllCity);
router.get("/manage/getAllDistrict.do",controller.getAllDistrict);

router.get("/manage/queryAllDept.do",controller.queryAllDept);
router.get("/manage/queryAllDeptCount.do",controller.queryAllDeptCount);
router.get("/manage/addDept.do",controller.addDept);
router.get("/manage/deleteOneDept.do",controller.deleteOneDept);
router.get("/manage/selectOneDept.do",controller.selectOneDept);
router.get("/manage/updateOneDept.do",controller.updateOneDept);

router.get("/manage/queryAllEmployee.do",controller.queryAllEmployee);
router.get("/manage/queryAllEmployeeCount.do",controller.queryAllEmployeeCount);
router.get("/manage/deleteOneEmp.do",controller.deleteOneEmp);
router.get("/manage/queryAllDeptInSelect.do",controller.queryAllDeptInSelect);
router.get("/manage/addNewEmp.do",controller.addNewEmp);
router.get("/manage/selectOneEmp.do",controller.selectOneEmp);
router.get("/manage/updateEmp.do",controller.updateEmp);

module.exports=router;