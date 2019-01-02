const express=require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const favicon = require("serve-favicon");
const goodsRouter = require("./routers/goodsRouter");
const adminRouter = require("./routers/adminRouter");
const formatRouter = require("./routers/formatRouter");
const route = require("./routers/myRouter");
const artroute = require("./routers/artRouter");
const path=require("path");
const session=require("express-session");
const cookieParser=require("cookie-parser");

const app = express();

/*设置日志为开发模式*/
app.use(logger("dev"));

/*session-cookie*/
app.use(cookieParser());
app.use(session({
    name:"zx",
    secret:"123",
    cookie:{
        maxAge:1000*60*60*24*30//以毫秒为单位
    },
    resave:true,//更新session-cookie失效时间
    rolling:true,
    saveUninitialized:true
}));

//视图引擎,ejs
app.set("views",path.join(__dirname,"views"));//视图文件路径
app.set("view engine","ejs");//视图解析引擎

/*设置post方式，文件的整合方式*/
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//通用
app.use("/",function(req,resp,next){
    app.locals.userName=req.session.userName;//app.locals全局
    app.locals.userId=req.session.userId;
    app.locals.userPwd=req.session.userPwd;
    app.locals.phone=req.session.phone;
    app.locals.email=req.session.email;
    next();
});
/*跨域访问设置*/

app.use("/manage*",(req,resp,next)=>{
    resp.header("Access-Control-Allow-Origin",'*');//允许所有来源访问
    resp.header("Access-Control-Allow-Headers","X-Requested-With");//响应头设置
    resp.header("Access-Control-Allow-Method","POST,GET,PUT,DELETE,OPTIONS");//允许访问的形式
    resp.header("Content-Type","application/json;charset=utf-8");//针对post请求
    next();
});

/*设置路由*/
app.use(route);
app.use(artroute);
app.use(goodsRouter);
app.use(formatRouter);
app.use(adminRouter);

/*加载除了html之外的资源，如css、js*/
app.use(express.static(__dirname+"/public"));
/*只加载html*/
app.use(express.static(__dirname+"/public/html"));

/*加载小图标*/
app.use(favicon(__dirname+"/public/images/favicon.ico"));

/*设置端口*/
app.set("port",8888);
app.listen(8888,function () {
    console.log("服务器启动");
});
