/**
 * Created by zhang on 2018/11/6.
 */
const userMode=require("../dao/lanmuDao");
const dbpool=require("../config/dbpoolconfig");
const userController={
    getHomePic(req,resp){
        //console.log("进入controller");
        dbpool.connect("SELECT * FROM t_homes ORDER BY h_id DESC LIMIT 6",
            [],(err,data)=>{
                //console.log(data);
                resp.send(data)
            })
    },
    getMoreHomePic(req,resp){
        //console.log(req.query.n);
        let n=(req.query.n)*6+6;
        //console.log(n);
        //if(>)
        dbpool.connect("SELECT * FROM t_homes WHERE h_id NOT IN (SELECT MAX(h_id) FROM  t_homes) ORDER BY h_id DESC LIMIT ?",
            [n],(err,data)=>{
                //console.log(data);
                resp.send(data)
            })
    },
    getHomeById(req,resp){
        console.log(req.query.h_id);
        userMode.getHome([req.query.h_id])
            .then(function (data) {
                // console.log(data);
                resp.render("homeDetail",{mydata:data,typeOne:4});
            })
    },

    getVisitPic(req,resp){
        dbpool.connect("select * from t_visit order by v_id DESC limit 6",
            [],(err,data)=>{
                //console.log(data);
                resp.send(data)
            })
    },
    getMoreVisitPic(req,resp){
        //console.log(req.query.n);
        let n=(req.query.n)*6+6;
        //console.log(n);
        dbpool.connect("select * from t_visit order by v_id DESC limit ?",
            [n],(err,data)=>{
                resp.send(data)
            })
    },
    getVisitById(req,resp){
        //console.log(req.query.h_id);
        userMode.getVisit([req.query.v_id])
            .then(function (data) {
                //console.log(data);
                resp.render("visitDetail",{mydata:data,typeOne:4});
            })
    },

    getArtistPic(req,resp){
        dbpool.connect("SELECT * FROM t_artist ORDER BY a_id DESC LIMIT 1",
            [],(err,data)=>{
                //console.log(data);
                resp.send(data);
            })
    },
    getMoreArtistPic(req,resp){
        dbpool.connect("SELECT * FROM t_artist ORDER BY a_id DESC",
            [],(err,data)=>{
                //console.log(data);
                resp.send(data);
            })
    },
    getArtistById(req,resp){
        //console.log(req.query.a_id);
        userMode.getArtist([req.query.a_id])
            .then(function (data) {
                resp.render("artistDetail",{mydata:data,typeOne:4});
            })
    }
};
module.exports=userController;


