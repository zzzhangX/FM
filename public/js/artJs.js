/**
 * Created by xml on 2018/10/29.
 */
//展览下面的样式数组
var imgStyle=[
    "translateX(80px) translateZ(80px) rotateY(-30deg)",//右边下面的第一张开始
    "translateX(160px) translateZ(-20px) rotateY(-30deg)",
    "translateX(240px) translateZ(-120px) rotateY(-30deg)",
    "translateX(-240px) translateZ(-120px) rotateY(30deg)",
    "translateX(-160px) translateZ(-20px) rotateY(30deg)",
    "translateX(-80px) translateZ(80px) rotateY(30deg)",
    " translateZ(300px)"//最上面一张结束
];

$(function () {
    $.ajax({
        type:"get",
        url:"/getNewArtist.do",//提交地址
        success:function (data) {
            // console.log(data);
            $(".body-newArtist-name span")[0].innerText=data[0].name;
            $(".body-newArtist-photo img")[0].src=data[0].photo;
            $(".body-newArtist-photo>div>span")[0].innerText=data[0].name;
            $(".body-newArtist-photo")[0].onclick=function () {
                window.location="/getOneBrief.do?id="+data[0].id;
            }
        },
        err:function (data) {
            console.log(data);
        }
    });
    $.ajax({
        type:"get",
        url:"/getAllArtist.do",//提交地址
        success:function (data) {
            for(var i=0;i<data.length;i++){
                $(".body-allArtist-show").append("<div><a href='/getOneBrief.do?id="+data[i].id+"'>" +
                    "<div></div>" +
                    "<div class='body-allArtist-show-shade'></div>" +
                    "<div><span>"+data[i].name+"</span></div>" +
                    "</a></div>");
                $($(".body-allArtist-show>div div:nth-child(1)")[i]).css({
                    "background-image":"url("+data[i].photo+")",
                    "background-size":"cover"
                });
                $(".body-allArtist-show-shade").hover(function () {
                    $(this).css("opacity","1")
                },function () {
                    $(this).css("opacity","0")
                });
            }
        },
        err:function (data) {
            console.log(data);
        }
    });
    $.ajax({
        type:"get",
        url:"/getPartExhibit.do",
        success:function (data) {
            console.log(data);
            showImg(data);
        },
        err:function (data) {
            console.log(data);
        }
    })
});
//显示出展览的图片
function showImg(data) {
    for(var i=0;i<data.length;i++){
        $(".body-show-display-photo").append("<img src='"+data[i].coverImg+"' onclick='clickImg("+i+")' numb='"+data[i].id+"'>");
        $(".body-show-display-photo img").eq(i).css("transform",imgStyle[i]);
    }
}
//展览图片部分的变换
function clickImg(num){//假设点击的是第四个   要变换成6   中间差2
    for(var j=6;j>=0;j--){
        $(".body-show-display-photo img").eq(num).css("transform",imgStyle[j]);//4   样式用4---6
        num--;
        if(num<0){
            num=6;
        }
    }
   if($(".body-show-display-photo img").eq(num).css("transform") =="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 300, 1)")
   {
       var id= $(".body-show-display-photo img").eq(num).attr("numb");
       window.location="/getOneExhibit1.do?id="+id;
   }
}



