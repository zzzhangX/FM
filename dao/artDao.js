/**
 * Created by xml on 2018/11/7.
 */

//连接数据库
const db=require("../config/dbpoolconfig");
const artistModel = {
    getNewArtist(params){
        return new Promise((resolve, reject) => {
            db.connect("SELECT * FROM artist ORDER BY id DESC LIMIT 1 ",
                params,
                (err, data) => {
                    if (!err) {
                        resolve(data);
                    } else {
                        reject(err);
                    }
                }
            )
        })
    },
    getAllArtist(params){
        return new Promise((resolve,reject)=>{
            db.connect("SELECT * FROM artist HAVING id NOT IN (SELECT MAX(id) FROM artist)",
                params,
                (err, data) => {
                    if (!err) {
                        resolve(data);
                    } else {
                        reject(err);
                    }
                }
            )
        })
    },
    getPartExhibit(params){
        return new Promise((resolve,reject)=>{
            db.connect("SELECT id,coverImg FROM exhibit ORDER BY id DESC LIMIT 7 ",
                params,
                (err,data)=>{
                    if (!err) {
                        resolve(data);
                    } else {
                        reject(err);
                    }
                }
            )
        })
    },
    getOneBrief(params){
        return new Promise((resolve,reject)=>{
            db.connect("select * from artist where id=?",
                params,
                (err,data)=>{
                    if (!err) {
                        resolve(data);
                    } else {
                        reject(err);
                    }
                }
            )
        })
    },
    getOneTalk(params){
        return new Promise((resolve,reject)=>{
            db.connect("select * from interview where artistId=?",
                params,
                (err,data)=>{
                    if (!err) {
                        resolve(data);
                    } else {
                        reject(err);
                    }
                }
            )
        })
    },
    getInterviewPhoto(params){
        return new Promise((resolve,reject)=>{
            db.connect("select * from interviewPhoto where interviewId=? order by id",
                params,
                (err,data)=>{
                    if (!err) {
                        resolve(data);
                    } else {
                        reject(err);
                    }
                }
            )
        })
    },
    getOneExhibit(params){
        return new Promise((resolve,reject)=>{
            db.connect("select * from exhibit where artistId=?",
                params,
                (err,data)=>{
                    if (!err) {
                        resolve(data);
                    } else {
                        reject(err);
                    }
                }
            )
        })
    },
    getOneWorks(params){
        return new Promise((resolve,reject)=>{
            db.connect("SELECT * FROM works WHERE artistId=? LIMIT 9",
                params,
                (err,data)=>{
                    if (!err) {
                        resolve(data);
                    } else {
                        reject(err);
                    }
                }
            )
        })
    },
    getAllWorks(params){
        return new Promise((resolve,reject)=>{
            db.connect("SELECT * FROM works WHERE artistId=?",
                params,
                (err,data)=>{
                    if (!err) {
                        resolve(data);
                    } else {
                        reject(err);
                    }
                }
            )
        })
    },
    getExhibitPhoto(params){
        return new Promise((resolve,reject)=>{
            db.connect("SELECT * FROM exhibitPhoto WHERE exhibitId=?",
                params,
                (err,data)=>{
                    if (!err) {
                        resolve(data);
                    } else {
                        reject(err);
                    }
                }
            )
        })
    },
    getAllNews(params){
        return new Promise((resolve,reject)=>{
            db.connect("SELECT * FROM news",
                params,
                (err,data)=>{
                    if (!err) {
                        resolve(data);
                    } else {
                        reject(err);
                    }
                }
            )
        })
    },

    //用户管理
    getOneUsersByName(params){
        return new Promise((resolve,reject)=>{
            db.connect("SELECT * FROM userinfo where userName like ? limit ?,?",
                ["%"+params[0]+"%",params[1],params[2]],
                (err, data) => {
                    if (!err) {
                        resolve(data);
                    } else {
                        reject(err);
                    }
                }
            )
        })
    },
    getOneUsersAddressByName(params){
        return new Promise((resolve,reject)=>{
            db.connect("SELECT * FROM addressinfo where userId=? and name like ? limit ?,?",
                [params[0],"%"+params[1]+"%",params[2],params[3]],
                (err, data) => {
                    if (!err) {
                        resolve(data);
                    } else {
                        reject(err);
                    }
                }
            )
        })
    },
    getAllUserCountByName(params){
        return new Promise((resolve,reject)=>{
            db.connect("SELECT count(*) as count FROM userinfo where userName like ?",
                ["%"+params[0]+"%"],
                (err, data) => {
                    if (!err) {
                        var result=String(Math.ceil(data[0].count/params[1]));
                        data=result;
                        resolve(data);
                    } else {
                        reject(err);
                    }
                }
            )
        })
    },
    getAllUserAddressCountByName(params){
        return new Promise((resolve,reject)=>{
            db.connect("SELECT count(*) as count FROM addressinfo where userId=? and name like ?",
                [params[0],"%"+params[1]+"%"],
                (err, data) => {
                    if (!err) {
                        var result=String(Math.ceil(data[0].count/params[2]));
                        data=result;
                        resolve(data);
                    } else {
                        reject(err);
                    }
                }
            )
        })
    },
    addNewUser(params){
        return new Promise((resolve,reject)=>{
            db.connect("INSERT INTO userinfo(userName,userPwd,phone,email)VALUES(?,?,?,?);",
                params,
                (err, data) => {
                    if (!err) {
                        resolve(data);
                    } else {
                        reject(err);
                    }
                }
            )
        })
    },
    addNewUserAddress(params){
        return new Promise((resolve,reject)=>{
            db.connect("INSERT INTO addressinfo(userId,name,phone,phone1,province,city,district,address,is_default)VALUES(?,?,?,?,?,?,?,?,?);",
                params,
                (err, data) => {
                    if (!err) {
                        resolve(data);
                    } else {
                        reject(err);
                    }
                }
            )
        })
    },
    deleteOneUser(params){
        return new Promise((resolve,reject)=>{
            db.connect("delete from userinfo where userId=?",
                params,
                (err, data) => {
                    if (!err) {
                        resolve(data);
                    } else {
                        reject(err);
                    }
                }
            )
        })
    },
    deleteOneUserAddress(params){
        return new Promise((resolve,reject)=>{
            db.connect("delete from addressinfo where id=?",
                params,
                (err, data) => {
                    if (!err) {
                        resolve(data);
                    } else {
                        reject(err);
                    }
                }
            )
        })
    },

    selectOneUser(params){
        return new Promise((resolve,reject)=>{
            db.connect("select * from userinfo where userId=?",
                params,
                (err, data) => {
                    if (!err) {
                        resolve(data);
                    } else {
                        reject(err);
                    }
                }
            )
        })
    },
    selectOneUserAddress(params){
        return new Promise((resolve,reject)=>{
            db.connect("select * from addressinfo where id=?",
                params,
                (err, data) => {
                    if (!err) {
                        resolve(data);
                    } else {
                        reject(err);
                    }
                }
            )
        })
    },
    updateUser(params){
        return new Promise((resolve,reject)=>{
            db.connect("update userinfo set userName=?,userPwd=?,phone=?,email=? where userId=?",
                params,
                (err, data) => {
                    if (!err) {
                        resolve(data);
                    } else {
                        reject(err);
                    }
                }
            )
        })
    },
    UpdateUserAddress(params){
        return new Promise((resolve,reject)=>{
            db.connect("UPDATE addressinfo SET NAME=?,phone=?,phone1=?,province=?,city=?,district=?,address=? WHERE id=?",
                params,
                (err, data) => {
                    if (!err) {
                        resolve(data);
                    } else {
                        reject(err);
                    }
                }
            )
        })
    },
    getAllProvince(params){
        return new Promise((resolve,reject)=>{
            db.connect("SELECT proId,proName FROM T_Province",
                params,
                (err, data) => {
                    if (!err) {
                        resolve(data);
                    } else {
                        reject(err);
                    }
                }
            )
        })
    },
    getAllCity(params){
        return new Promise((resolve,reject)=>{
            db.connect("SELECT * FROM T_City where proId=?",
                params,
                (err, data) => {
                    if (!err) {
                        resolve(data);
                    } else {
                        reject(err);
                    }
                }
            )
        })
    },
    getAllDistrict(params){
        return new Promise((resolve,reject)=>{
            db.connect("SELECT * FROM T_district where cityId=?",
                params,
                (err, data) => {
                    if (!err) {
                        resolve(data);
                    } else {
                        reject(err);
                    }
                }
            )
        })
    },

    queryAllDept(params){
        return new Promise((resolve,reject)=>{
            db.connect("SELECT * ,(SELECT COUNT(*) FROM employee WHERE deptId=dept.id) AS COUNT FROM dept where dept_name like ? limit ?,?",
                ["%"+params[0]+"%",params[1],params[2]],
                (err, data) => {
                    if (!err) {
                        resolve(data);
                    } else {
                        reject(err);
                    }
                }
            )
        })
    },
    queryAllDeptCount(params){
        return new Promise((resolve,reject)=>{
            db.connect("SELECT COUNT(*) as count FROM dept where dept_name like ?",
                ["%"+params[0]+"%"],
                (err, data) => {
                    if (!err) {
                        var result=String(Math.ceil(data[0].count/params[1]));
                        data=result;
                        resolve(data);
                    } else {
                        reject(err);
                    }
                }
            )
        })
    },
    addDept(params){
        return new Promise((resolve,reject)=>{
            db.connect("insert into dept(id,dept_name) values(null,?) ",
                [params],
                (err, data) => {
                    if (!err) {
                        resolve(data);
                    } else {
                        reject(err);
                    }
                }
            )
        })
    },
    deleteOneDept(params){
        return new Promise((resolve,reject)=>{
            db.connect("delete from dept where id=? ",
                params,
                (err, data) => {
                    if (!err) {
                        resolve(data);
                    } else {
                        reject(err);
                    }
                }
            )
        })
    },

    selectOneDept(params){
        return new Promise((resolve,reject)=>{
            db.connect("select * from dept where id=? ",
                params,
                (err, data) => {
                    if (!err) {
                        resolve(data);
                    } else {
                        reject(err);
                    }
                }
            )
        })
    },
    updateOneDept(params){
        return new Promise((resolve,reject)=>{
            db.connect("update dept set dept_name=? where id=? ",
                params,
                (err, data) => {
                    if (!err) {
                        resolve(data);
                    } else {
                        reject(err);
                    }
                }
            )
        })
    },

    queryAllEmployee(params){
        return new Promise((resolve,reject)=>{
            db.connect("SELECT * ,(SELECT dept_name FROM dept WHERE id=employee.deptId) AS dept FROM employee where employeeName like ? limit ?,?",
                ["%"+params[0]+"%",params[1],params[2]],
                (err, data) => {
                    if (!err) {
                        resolve(data);
                    } else {
                        reject(err);
                    }
                }
            )
        })
    },
    queryAllEmployeeCount(params){
        return new Promise((resolve,reject)=>{
            db.connect("SELECT COUNT(*) as count FROM employee where employeeName like ?",
                ["%"+params[0]+"%"],
                (err, data) => {
                    if (!err) {
                        var result=String(Math.ceil(data[0].count/params[1]));
                        data=result;
                        resolve(data);
                    } else {
                        reject(err);
                    }
                }
            )
        })
    },
    deleteOneEmp(params){
        return new Promise((resolve,reject)=>{
            db.connect("delete from employee where id=? ",
                params,
                (err, data) => {
                    if (!err) {
                        resolve(data);
                    } else {
                        reject(err);
                    }
                }
            )
        })
    },
    queryAllDeptInSelect(params){
        return new Promise((resolve,reject)=>{
            db.connect("select * from dept",
                params,
                (err, data) => {
                    if (!err) {
                        resolve(data);
                    } else {
                        reject(err);
                    }
                }
            )
        })
    },
    addNewEmp(params){
        return new Promise((resolve,reject)=>{
            db.connect("insert into employee(id,employeeName,phone,hiredate,deptId) values(null,?,?,?,(select id from dept where dept_name=?))",
                params,
                (err, data) => {
                    if (!err) {
                        resolve(data);
                    } else {
                        reject(err);
                    }
                }
            )
        })
    },
    selectOneEmp(params){
        return new Promise((resolve,reject)=>{
            db.connect("select *,(select dept_name from dept where id=employee.id) as deptName from employee where id = ?",
                params,
                (err, data) => {
                    if (!err) {
                        resolve(data);
                    } else {
                        reject(err);
                    }
                }
            )
        })
    },
    updateEmp(params){
        return new Promise((resolve,reject)=>{
            db.connect("update employee set employeeName=?,phone=?,hiredate=?,deptId=(select id from dept where dept_name=?) where id=?",
                params,
                (err, data) => {
                    if (!err) {
                        resolve(data);
                    } else {
                        reject(err);
                    }
                }
            )
        })
    },

};
module.exports=artistModel;