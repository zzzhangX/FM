/**
 * Created by xml on 2018/10/29.
 */
$(function () {
    $.ajax({
        type: "get",
        url: "/getAllNews.do",
        success: function (data) {
            console.log(data);
            for(var i=0;i<data.length;i++){
                $(".wrapper-main").append("" +
                    "<li year='"+data[i].dateTime.slice(0,4)+"'>" +
                    "<span></span>" +
                    "<p>"+data[i].dateTime.slice(5,10)+"</p>" +
                    "<p>"+data[i].name+"</p>" +
                    "<p class='lightP'>"+data[i].info+"</p>" +
                    "<img src='"+data[i].img+"' alt=''>" +
                    "</li>")
            }
        },
        err: function (data) {
            console.log(data);
        }
    });
    $(window).scroll(function () {
        if(scrollY<2500){
            $(".year-wrapper li:nth-child(1)").attr("class","hoverClick");
            $(".year-wrapper li:nth-child(4),.year-wrapper li:nth-child(2),.year-wrapper li:nth-child(3)").removeClass("hoverClick");
        }
        else if(scrollY>=2500&&scrollY<3000){
            $(".year-wrapper li:nth-child(2)").attr("class","hoverClick");
            $(".year-wrapper li:nth-child(4),.year-wrapper li:nth-child(1),.year-wrapper li:nth-child(3)").removeClass("hoverClick");
        }
        else if(scrollY>=3000&&scrollY<3600){
            $(".year-wrapper li:nth-child(3)").attr("class","hoverClick");
            $(".year-wrapper li:nth-child(1),.year-wrapper li:nth-child(2),.year-wrapper li:nth-child(4)").removeClass("hoverClick");
        }else{
            $(".year-wrapper li:nth-child(4)").attr("class","hoverClick");
            $(".year-wrapper li:nth-child(1),.year-wrapper li:nth-child(2),.year-wrapper li:nth-child(3)").removeClass("hoverClick");
        }
    });

});

