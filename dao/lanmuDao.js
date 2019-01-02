/**
 * Created by zhang on 2018/11/6.
 */
const dbpool=require("../config/dbpoolconfig");
const userMode={
    getHome(params){
        return new Promise((resolve,reject)=>{
            dbpool.connect("SELECT h_number,h_name,h_address,h_time,writeby,photoby,p_src,p_intro FROM t_homes,t_homedetail,t_lanmupic WHERE t_homes.`h_id`=t_homedetail.`home_id` AND t_homedetail.`home_pic`=t_lanmupic.`p_hd_id` AND h_id=?",
                params,
                (err,data)=>{
                    // console.log(data);
                    resolve(data);
                })
        })
    },
    getVisit(params){
        return new Promise((resolve,reject)=>{
            dbpool.connect("SELECT * FROM t_visitdetail,t_visit WHERE t_visit.`v_id`=t_visitdetail.`visit_id` AND t_visitdetail.`visit_id`=?",
                params,
                (err,data)=>{
                    console.log(data);
                    resolve(data);
                })
        })
    },
    getArtist(params){
        return new Promise((resolve,reject)=>{
            dbpool.connect("SELECT * FROM t_artist,t_artistdetail WHERE t_artist.`a_id`=t_artistdetail.`artist_id` AND t_artistdetail.`artist_id`=?",
                params,
                (err,data)=>{
                    console.log(data);
                    resolve(data);
                })
        })
    }
};
module.exports=userMode;