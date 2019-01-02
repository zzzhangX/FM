/**
 * Created by xml on 2018/11/7.
 */
const artistModel=require("../dao/artDao.js");
const controllerObj={
    art:function (req,res) {
        res.render("art", {typeOne: req.query.typeOne});
    },
    news:function (req,res) {
        res.render("news", {typeOne: req.query.typeOne});
    },
    getNewArtist(req,resp){
        artistModel.getNewArtist()
            .then((data)=>{
            resp.send(data);
            });
    },
    getAllArtist(req,resp){
        artistModel.getAllArtist()
            .then((data)=>{
                resp.send(data)
            })
    },
    getPartExhibit(req,resp){
        artistModel.getPartExhibit()
            .then((data)=>{
            resp.send(data);
            })
    },
    getOneBrief(req,resp){
        artistModel.getOneBrief([req.query.id])
            .then((data)=>{
                var profile=data[0].profile.replace(/\//g,'<br>');
                resp.render("artBrief",{
                    photo:data[0].photo,
                    name:data[0].name,
                    profile:profile,
                    typeOne:3
                })
            })
    },
    getOneTalk(req,resp){
        artistModel.getOneTalk([req.query.id])
            .then((data)=>{
                resp.send(data);
            })
    },
    getOneTalk1(req,resp){
        artistModel.getOneTalk([req.query.id])
            .then((data)=>{
                resp.render("artTalk",{
                    id:data[0].id,
                    name:data[0].name,
                    time:data[0].time,
                    talkBrief:data[0].talkBrief,
                    typeOne:3
                })
            })
    },
    getInterviewPhoto(req,resp){
        artistModel.getInterviewPhoto([req.query.id])
            .then((data)=>{
                resp.send(data);
            })
    },
    getOneExhibit(req,resp){
        artistModel.getOneExhibit([req.query.id])
            .then((data)=>{
                resp.send(data);
            })
    },
    getOneExhibit1(req,resp){
        artistModel.getOneExhibit([req.query.id])
            .then((data)=>{
                if(data[0].exhibitInfo != null){
                    var exhibitInfo=data[0].exhibitInfo.replace(/\//g,'<br>');
                }
                console.log("exhibit== =========");
                console.log(data);
                resp.render("artExhibit",{
                    title:data[0].title,
                    titleDate:data[0].titleDate,
                    name:data[0].name,
                    date:data[0].date,
                    time:data[0].time,
                    address:data[0].address,
                    carouselImg:data[0].carouselImg,
                    exhibitInfo:exhibitInfo,
                    teaInfo:data[0].teaInfo,
                    artistName:data[0].artistName,
                    id:data[0].id,
                    typeOne:3
                })
            })
    },
    getOneWorks(req,resp){
        artistModel.getOneWorks([req.query.id])
            .then((data)=>{
                resp.send(data);
            })
    },
    getAllWorks(req,resp){
        artistModel.getAllWorks([req.query.id])
            .then((data)=>{
                resp.send(data);
            })
    },
    getExhibitPhoto(req,resp){
        artistModel.getExhibitPhoto([req.query.id])
            .then((data)=>{
                resp.send(data);
            })
    },
    getAllNews(req,resp){
        artistModel.getAllNews([req.query.id])
            .then((data)=>{
                resp.send(data);
            })
    },
//    ==================用户管理
    getOneUsersByName(req,resp){
        artistModel.getOneUsersByName([req.query.username,(req.query.currentPage - 1) * req.query.pageCount,Number(req.query.pageCount)])
            .then((data)=>{
                resp.send(data);
            })
    },
    getAllUserCountByName(req,resp){
        artistModel.getAllUserCountByName([req.query.username,req.query.pageCount])
            .then((data)=>{
                resp.send(data)
            })
    },

    getOneUsersAddressByName(req,resp){
        artistModel.getOneUsersAddressByName([req.query.id,req.query.name,(req.query.currentPage - 1) * req.query.pageCount,Number(req.query.pageCount)])
            .then((data)=>{
                resp.send(data)
            })
    },
    getAllUserAddressCountByName(req,resp){
        artistModel.getAllUserAddressCountByName([req.query.id,req.query.name,req.query.pageCount])
            .then((data)=>{
                resp.send(data);
            })
    },

    addNewUser(req,resp){
        let username=req.query.username;
        let pass=req.query.pass;
        let phone=req.query.phone;
        let email=req.query.email;
        artistModel.addNewUser([username,pass,phone,email])
            .then((data)=>{
                resp.send(data);
            })
    },
    addNewUserAddress(req,resp){
        let userId=req.query.userId;
        let username=req.query.username;
        let phone=req.query.phone;
        let bakphone=req.query.bakphone;
        let province=req.query.province;
        let city=req.query.city;
        let district=req.query.district;
        let address=req.query.address;
        let is_default=req.query.is_default;
        artistModel.addNewUserAddress([userId,username,phone,bakphone,province,city,district,address,is_default])
            .then((data)=>{
                resp.send(data);
            })
    },
    deleteOneUser(req,resp){
        let userId=req.query.userId;
        artistModel.deleteOneUser([userId])
            .then((data)=>{
                resp.send(data);
            })
    },
    deleteOneUserAddress(req,resp){
        let id=req.query.id;
        artistModel.deleteOneUserAddress([id])
            .then((data)=>{
                resp.send(data);
            })
    },

    selectOneUser(req,resp){
        let userId=req.query.userId;
        artistModel.selectOneUser([userId])
            .then((data)=>{
                resp.send(data);
            })
    },
    selectOneUserAddress(req,resp){
        let id=req.query.id;
        artistModel.selectOneUserAddress([id])
            .then((data)=>{
                resp.send(data);
            })
    },
    updateUser(req,resp){
        let username=req.query.username;
        let pass=req.query.pass;
        let phone=req.query.phone;
        let email=req.query.email;
        let userId=req.query.userId;
        artistModel.updateUser([username,pass,phone,email,userId])
            .then((data)=>{
                resp.send(data);
            })
    },
    UpdateUserAddress(req,resp){
        let id=req.query.id;
        let username=req.query.username1;
        let phone=req.query.phone1;
        let phone1=req.query.bakphone1;
        let province=req.query.province1;
        let city=req.query.city1;
        let district=req.query.district1;
        let address=req.query.address;
        artistModel.UpdateUserAddress([username,phone,phone1,province,city,district,address,id])
            .then((data)=>{
                resp.send(data);
            })
    },
    getAllProvince(req,resp){
        artistModel.getAllProvince()
            .then((data)=>{
                resp.send(data);
            })
    },
    getAllCity(req,resp){
        console.log(req.query.proId);
        artistModel.getAllCity([req.query.proId])
            .then((data)=>{
                resp.send(data);
            })
    },
    getAllDistrict(req,resp){
        artistModel.getAllDistrict([req.query.cityId])
            .then((data)=>{
                resp.send(data);
            })
    },


    queryAllDept(req,resp){
        let deptName=req.query.deptName;
        let currentPage=req.query.currentPage;
        let pageCount=req.query.pageCount;
        artistModel.queryAllDept([deptName,Number((currentPage - 1) * pageCount),Number(pageCount)])
            .then((data)=>{
                resp.send(data);
            })
    },
    queryAllDeptCount(req,resp){
        artistModel.queryAllDeptCount([req.query.deptName,req.query.pageCount])
            .then((data)=>{
                resp.send(data)
            })
    },

    addDept(req,resp){
        artistModel.addDept([req.query.deptName])
            .then((data)=>{
                resp.send(data)
            })
    },
    deleteOneDept(req,resp){
        let id=req.query.id;
        artistModel.deleteOneDept([id])
            .then((data)=>{
                resp.send(data);
            })
    },
    selectOneDept(req,resp){
        let id=req.query.id;
        artistModel.selectOneDept([id])
            .then((data)=>{
                resp.send(data);
            })
    },
    updateOneDept(req,resp){
        let id=req.query.id;
        let name=req.query.deptName;
        // console.log(name+"===="+id);
        artistModel.updateOneDept([name,id])
            .then((data)=>{
                resp.send(data);
            })
    },

    queryAllEmployee(req,resp){
        let currentPage=req.query.currentPage;
        let pageCount=req.query.pageCount;
        artistModel.queryAllEmployee([req.query.employeeName,Math.abs((currentPage - 1) * pageCount),Number(pageCount)])
            .then((data)=>{
                resp.send(data);
            })
    },
    queryAllEmployeeCount(req,resp){
        artistModel.queryAllEmployeeCount([req.query.employeeName,req.query.pageCount])
            .then((data)=>{
                resp.send(data)
            })
    },
    deleteOneEmp(req,resp){
        artistModel.deleteOneEmp([req.query.id])
            .then((data)=>{
                resp.send(data)
            })
    },
    queryAllDeptInSelect(req,resp){
        artistModel.queryAllDeptInSelect()
            .then((data)=>{
                resp.send(data)
            })
    },
    addNewEmp(req,resp){
        artistModel.addNewEmp([req.query.empname,req.query.phone,req.query.dateValue,req.query.deptName])
            .then((data)=>{
                resp.send(data)
            })
    },
    selectOneEmp(req,resp){
        artistModel.selectOneEmp([req.query.id])
            .then((data)=>{
                resp.send(data)
            })
    },
    updateEmp(req,resp){
        let id=req.query.empid1;
        let employeeName=req.query.empname1;
        let phone=req.query.phone1;
        let date=req.query.dateValue1;
        let deptName=req.query.deptName1;
        artistModel.updateEmp([employeeName,phone,date,deptName,id])
            .then((data)=>{
                resp.send(data)
            })
    },
};

module.exports=controllerObj;