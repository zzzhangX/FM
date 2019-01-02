/*该配置文件用于向服务器存储上传的文件，不负责向客户端做出响应
 * destination、filename的名字不能改变
 * file.fieldname用于查看html中用于上传文件的输入框的name
 * file.originalname用于查看上传文件的名字,包括后缀
 * */
const multer=require("multer");
const storage=multer.diskStorage({
    /*上传文件重命名,如果该方法没有被调用，那么文件名就是系统随机产生的一个名字*/
    filename:function (req,file,cb) {
        console.log(req);
        var fileFormat=(file.originalname).split(".");
        /*cb()将上传的文件进行重命名,Date.now()，获取当前时间*/
        cb(null,fileFormat[0]+"-"+Date.now()+"."+fileFormat[fileFormat.length-1]);
    },

    //用于保存上传文件的路径（服务器端）；
    destination:function (req,file,cb) {
        // console.log("000000000000000"+file)
        cb(null,"./public/images/lanmu");
    }
});
const upload=multer({
    storage:storage
});
module.exports=upload;