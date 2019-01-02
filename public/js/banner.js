
//普通轮播
var imgBanner=document.getElementById("imgBanner");
var arr=["images/banner_furniture/1.jpg","images/banner_furniture/2.jpg","images/banner_furniture/3.jpg","images/banner_furniture/4.jpg","images/banner_furniture/5.jpg",];
var index=0;
imgBanner.style.backgroundImage="url(../"+arr[index]+")";
clearInterval(time);
var time=setInterval(dis,3000);
imgBanner.onmouseover=function () {
    clearInterval(time)
};
imgBanner.onmouseout=function () {
    clearInterval(time);
    time=setInterval(dis,3000);
};
function dis() {//自动改变背景图片
    index++;
    if(index==arr.length){
        index=0;
    }
    imgBanner.style.backgroundImage="url(../"+arr[index]+")";
    //图片对应的小圆点
    disCirCleSyle();
}
//生成控制小圆点
var divCircle=document.getElementById("divCircle");
for(var i=0;i<arr.length;i++){
    divCircle.innerHTML+="<span class='span'></span>";
}
disCirCleSyle();
function disCirCleSyle() {//给当前小圆点添加类名
    var spanArr=divCircle.getElementsByClassName("span");
    for(var i=0;i<spanArr.length;i++){
        spanArr[i].classList.remove("circle");
    }
    divCircle.getElementsByClassName("span")[index].classList.add("circle");
}
for(var i=0;i<arr.length;i++){//绑定小圆点的单击事件
    document.getElementsByClassName("span")[i].index=i;
    document.getElementsByClassName("span")[i].onclick=function () {
        index=this.index;
        clearInterval(time);
        document.getElementById("imgBanner").style.backgroundImage="url(../"+arr[index]+")";
        disCirCleSyle();
        time=setInterval(dis,3000);
    }
}
$(".banner .contentO").on("click",function () {
    if (index==0){
        console.log(index);
        window.location.href="/furniture.do?typeOne=1";
    }
    if (index==1){
        window.location.href="../html/ymb.html";
    }
});
