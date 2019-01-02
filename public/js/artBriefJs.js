/**
 * Created by xml on 2018/11/1.
 */

var id=location.search.split("=")[1];
$(function () {
    $.ajax({
        type:"get",
        url:"/getOneTalk.do",
        data:{
            id:id
        },
        success:function (data) {
            if(''==data){
                $(".exhibit-list-staticLeft").remove();
                $(".exhibit-list-line-left").remove();
                $(".exhibit-list-staticRight").css({"margin":"0 auto","float":"none"});
                $(".exhibit-list-line-right").css({"margin":"0 auto","float":"none"});
                $(".exhibit-list-line-bottom").remove();
            }else{
                $(".exhibit-list-staticLeft-shade div:nth-child(2)")[0].innerText=data[0].name;
                $(".exhibit-list-date-left")[0].innerText=data[0].time;
                $(".exhibit-list-date-left")[1].innerText=data[0].time;
                $(".exhibit-list-staticLeft").css({
                    "background":"url('../"+data[0].coverImg+"')",
                    "background-size":"cover"
                });
            }
        },
        err:function (data) {
            console.log(data);
        }
    });
    $.ajax({
        type:"get",
            url:"/getOneExhibit.do",
        data:{
            id:id
        },
        success:function (data) {
            if(''==data){
                $(".exhibit-list-staticRight").remove();
                $(".exhibit-list-line-right").remove();
                $(".exhibit-list-staticLeft").css({"margin":"0 auto","float":"none"});
                $(".exhibit-list-line-left").css({"margin":"0 auto","float":"none"});
                $(".exhibit-list-line-bottom").remove();
            }else{
                $(".exhibit-list-staticRight-shade div:nth-child(2)")[0].innerText=data[0].title;
                $(".exhibit-list-date-right")[0].innerText=data[0].titleDate;
                $(".exhibit-list-date-right")[1].innerText=data[0].titleDate;
                $(".exhibit-list-staticRight").css({
                    "background":"url('"+data[0].coverImg+"')",
                    "background-size":"cover"
                });
            }
        },
        err:function (data) {
            console.log(data);
        }
    });
    showWorks();
});

function moreWorks() {
    $.ajax({
        type:"get",
        url:"/getAllWorks.do",
        data:{
            id:id
        },
        success:function (data) {
            $(".exhibit-list-work-show div").remove();
            for(var i=0;i<data.length;i++){
                $(".exhibit-list-work-show").append(
                    "<div>" +
                    "<div style='background: url("+data[i].worksImg+")'>" +
                    "</div>" +
                    "<div>" +
                    "<span>"+data[i].worksName+"</span>" +
                    "</div>" +
                    "</div>");
                $(".exhibit-list-work-show>div div").css({
                    "background-size":"contain",
                    "background-repeat":"no-repeat",
                    "background-position":"center center"
                })
            }
            $(".moreWorkDiv").remove();
        },
        err:function (data) {
            console.log(data);
        }
    });

}
function goToTalk() {
    window.location="/getOneTalk1.do?id="+id;
}

function goToExhibit() {
    window.location="/getOneExhibit1.do?id="+id;
}
function showWorks(){
    $.ajax({
        type:"get",
        url:"/getOneWorks.do",
        data:{
            id:id
        },
        success:function (data) {
            if(data.length < 9){
                $(".moreWorkDiv").remove();
            }
            for(var i=0;i<data.length;i++){
                $(".exhibit-list-work-show").append(
                    "<div>" +
                    "<div style='background: url("+data[i].worksImg+")'>" +
                    "</div>" +
                    "<div>" +
                    "<span>"+data[i].worksName+"</span>" +
                    "</div>" +
                    "</div>");
                $(".exhibit-list-work-show>div div").css({
                    "background-size":"contain",
                    "background-repeat":"no-repeat",
                    "background-position":"center center"
                })
            }
        },
        err:function (data) {
            console.log(data);
        }
    });
}


