/**
 * Created by zhang on 2018/12/5.
 */
const admintDao = require("../dao/adminDao");
const dbpool=require("../config/dbpoolconfig");
const muilter=require("../config/lanmuuploadconfig");
var upload=muilter.single('file');
const adminController={
    //登录
    adminLogin(req,resp){
        console.log("111111111111");
        // console.log("111111111111");
        console.log(req.query.password);
        admintDao.admin_login([req.query.name,req.query.password]).then(function (data) {
            resp.send(data)
        })
    },
    //个人中心
    personal(req,resp){
        dbpool.connect("select * from admin where adminId=?",[req.query.myId],(err,data)=>{
            // console.log(data);
            resp.send(data);
        })
    },
    personalEdit(req,resp){
        let sql="update admin set adminName=?,adminphone=?,adminemail=? where adminId=?";
        console.log(req.query)
        dbpool.connect(sql,[req.query.myName,req.query.myTel,req.query.myEmail,req.query.myId],
            (err,data)=>{
                console.log("qqqqqqq")
            })
    },
    editPwd(req,resp){
        let sql="update admin set adminpwd=? where adminId=?";
        dbpool.connect(sql,[req.query.newPwd,req.query.myId],
            (err,data)=>{

            })
    },
    //管理员管理
    getAllAdmin(req,resp){
        let pageCount=7;//每页展示3条信息
        let currentPage=req.query.currentPage;//当前展示第几页
        let sql="SELECT * FROM admin limit ?,?";
        /*limit 0,7 ============1 page
         * limit 7,7=============2 page
         * limit 14,7 =============3 page
         * 第一个参数=当前页-1*每页显示多少条*/
        dbpool.connect(sql,[(currentPage-1)*pageCount,pageCount],(err,data)=>{
            // console.log(data);
            resp.send(data);
        })
    },
    getTotalPage(req,resp){
        let pageCount=7;//每页显示三条
        dbpool.connect("select count(*) as totalcount from admin",[],(err,data)=>{
            // console.log(data[0].totalcount);
            let result=Math.ceil(data[0].totalcount/pageCount);
            result=String(result);
            // console.log(typeof result);
            resp.send(result);
        })
    },
    insertAdmin(req,resp){
        console.log(req.query)
        let sql="INSERT INTO admin VALUES (NULL,?,?,?,?,?)";
        dbpool.connect(sql,[req.query.myName,req.query.myPwd,req.query.myTel,req.query.myEmail,req.query.myLevel],
            (err,data)=>{

            })
    },
    delAdmin(req,resp){
        let sql="DELETE FROM admin WHERE adminId=?";
        dbpool.connect(sql,[req.query.myId],
            (err,data)=>{
            })
    },
    openAdmin(req,resp){
        let sql="select * FROM admin WHERE adminId=?";
        dbpool.connect(sql,[req.query.myId],
            (err,data)=>{
            // console.log(data);
                resp.send(data)
            })
    },
    editAdmin(req,resp){
        let sql="update admin set adminName=?,adminpwd=?,adminphone=?,adminemail=?,adminlevel=? where adminId=?"
        dbpool.connect(sql,[req.query.adminName,req.query.adminpwd,req.query.adminphone,req.query.adminemail,req.query.adminlevel,req.query.myId],
            (err,data)=>{
            // console.log("qqqqqqq")
            })
    },
    searchAdmin(req,resp){
        let pageCount=7;//每页展示3条信息
        let currentPage=req.query.currentPage;//当前展示第几页
        let adminName="%"+req.query.adminName+"%";
        let sql="SELECT * FROM admin WHERE adminName LIKE ? LIMIT ?,?";
        /*limit 0,7 ============1 page
         * limit 7,7=============2 page
         * limit 14,7 =============3 page
         * 第一个参数=当前页-1*每页显示多少条*/
        dbpool.connect(sql,[adminName,(currentPage-1)*pageCount,pageCount],(err,data)=>{
            console.log(data);
            resp.send(data);
        })
    },
    //栏目管理
    getLanMuPageTotal(req,resp){
        let pageCount=7;//每页显示三条
        dbpool.connect("select count(*) as totalcount from t_homes",[],(err,data)=>{
            // console.log(data[0].totalcount);
            let result=Math.ceil(data[0].totalcount/pageCount);
            result=String(result);
            // console.log(typeof result);
            // console.log(result);
            resp.send(result);
        })
    },
    getAllLanMu(req,resp){
        let pageCount=7;//每页展示3条信息
        let currentPage=req.query.currentPage;//当前展示第几页
        let sql="SELECT * FROM t_homes limit ?,?";
        /*limit 0,7 ============1 page
         * limit 7,7=============2 page
         * limit 14,7 =============3 page
         * 第一个参数=当前页-1*每页显示多少条*/
        dbpool.connect(sql,[(currentPage-1)*pageCount,pageCount],(err,data)=>{
            // console.log(data);
            resp.send(data);
        })
    },
    searchHome(req,resp){
        let pageCount=7;//每页展示3条信息
        let currentPage=req.query.currentPage;//当前展示第几页
        let h_name="%"+req.query.h_name+"%";
        let sql="SELECT * FROM t_homes WHERE h_name LIKE ? LIMIT ?,?";
        /*limit 0,7 ============1 page
         * limit 7,7=============2 page
         * limit 14,7 =============3 page
         * 第一个参数=当前页-1*每页显示多少条*/
        dbpool.connect(sql,[h_name,(currentPage-1)*pageCount,pageCount],(err,data)=>{
            console.log(data);
            resp.send(data);
        })
    },
    addHome(req,resp){
        upload(req,resp,function (err) {
            let photoPath=req.file.path;
            // console.log("==========="+photoPath);
            photoPath = photoPath .replace(/\\/g,"/");
            photoPath = photoPath.replace(/public/,"");
            // console.log("==========="+photoPath);
            let sql="INSERT INTO t_homes VALUES (null,?,?,?,?,?)";
            let arr=[req.body.num,req.body.name,req.body.region,req.body.myDate,photoPath];
            // console.log(req.body)
            dbpool.connect(sql,arr,(err,data)=>{
                console.log(err+"成功！！！！！！！！！！！")
            });
        })
    },
    delHome(req,resp){
        dbpool.connect("DELETE FROM t_homes WHERE h_id=?",[req.query.h_id],(err,data)=>{
            // console.log("删除成功");
        })
    },
    openHome(req,resp){
        dbpool.connect("select * FROM t_homes WHERE h_id=?",[req.query.h_id],(err,data)=>{
            // console.log(data)
            resp.send(data);
        })
    },
    editHome(req,resp){
        // let sql="update t_homes set h_number=?,h_name=?,h_address=?,h_time=? where h_id=?";
        // let arr=[req.query.num,req.query.name,req.query.region,req.query.myDate,req.query.myId];
        // dbpool.connect(sql,arr,
        //     (err,data)=>{
        //         console.log("修改成功")
        //     })
        upload(req,resp,function (err) {
            let photoPath=req.file.path;
            console.log("==========="+photoPath);
            photoPath = photoPath .replace(/\\/g,"/");
            photoPath = photoPath.replace(/public/,"");
            console.log("==========="+photoPath);
            let sql="update t_homes set h_number=?,h_name=?,h_address=?,h_time=?,h_img=? where h_id=?";
            let arr=[req.body.num,req.body.name,req.body.region,req.body.myDate,photoPath,req.body.myId];
            console.log(arr)
            // console.log(req.body)
            dbpool.connect(sql,arr,(err,data)=>{
                // console.log(err+"成功！！！！！！！！！！！")
            })
        })
    },
    getDetailByIdPageTotal(req,resp){
        let pageCount=7;//每页显示三条
        let sql="SELECT COUNT(p_id) AS totalcount FROM t_homes,t_homedetail,t_lanmupic WHERE t_homes.`h_id`=t_homedetail.`home_id` AND t_homedetail.`home_pic`=t_lanmupic.`p_hd_id` AND h_id=?"
        let h_id=parseInt(req.query.h_id);
        // console.log(h_id);
        // console.log(typeof h_id);
        dbpool.connect(sql,[h_id],(err,data)=>{
            // console.log(data);
            let result=Math.ceil(data[0].totalcount/pageCount);
            result=String(result);
            resp.send(result);
        })
    },
    getHomeById(req,resp){
        let pageCount=7;//每页展示3条信息
        let currentPage=req.query.currentPage;//当前展示第几页
        let sql="SELECT p_id,h_name,p_src,p_intro " +
            "FROM t_homes,t_homedetail,t_lanmupic " +
            "WHERE t_homes.`h_id`=t_homedetail.`home_id` " +
            "AND t_homedetail.`home_pic`=t_lanmupic.`p_hd_id` " +
            "AND h_id=?" +
            "limit ?,?";
        dbpool.connect(sql,[req.query.h_id,(currentPage-1)*pageCount,pageCount],
            (err,data)=>{
                resp.send(data)
            })
    },
    getHomeName(req,resp){
        dbpool.connect("select * from t_homes where h_id=?",[req.query.h_id],
            (err,data)=>{
                resp.send(data)
            })
    },
    uploadFile(req,resp){
        upload(req,resp,function (err) {
            let photoPath=req.file.path;
            photoPath=photoPath.replace(/public/,"");
            let myid=parseInt(req.body.picId);
            let sql="INSERT  INTO t_lanmupic VALUES (NULL,?,?,?)";
            let arr=[myid,photoPath,req.body.intro];
            dbpool.connect(sql,arr,(err,data)=>{
                // console.log(err+"成功！！！！！！！！！！！")
            })
        })
    },
    editUploadFile(req,resp){
        upload(req,resp,function (err) {
            let photoPath=req.file.path;
            photoPath=photoPath.replace(/public/,"");
            let myid=parseInt(req.body.picId);
            let sql="UPDATE t_lanmupic SET p_src=?,p_intro=? WHERE p_id=?";
            let arr=[photoPath,req.body.intro,myid];
            dbpool.connect(sql,arr,(err,data)=>{
                if(err!=null){
                    console.log(err+"！！！！！！！！！！！")
                }
            })
        })
    },
    delDetail(req,resp){
        dbpool.connect("DELETE FROM t_lanmupic WHERE p_id=?",[req.query.p_id],(err,data)=>{
            console.log("删除成功");
        })
    },
    openDetail(req,resp){
        dbpool.connect("select * FROM t_lanmupic WHERE p_id=?",[req.query.p_id],
            (err,data)=>{
            resp.send(data)
        })
    }
};
module.exports=adminController;