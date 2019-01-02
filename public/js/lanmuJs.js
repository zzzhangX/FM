$(function(){
    myHomeLoad();
    myVisitLoad();
    myArtistLoad();
    /*页面加载时显示图片*/
    function myHomeLoad(){
        $.ajax({
            type:"post",
            url:"/getHomeImg.do",
            data:{
            },
            success:function (data) {
                //console.log(data.length);
                homeCallback(data);
            },
            err:function (data) {
                console.log(data);
            }
        });
    }
    function myVisitLoad(){
        $.ajax({
            type:"post",
            url:"/getVisitImg.do",
            data:{
            },
            success:function (data) {
                visitCallback(data);
            },
            err:function (data) {
                console.log(data);
            }
        });
    }
    function myArtistLoad(){
        $.ajax({
            type:"post",
            url:"/getArtistImg.do",
            data:{
            },
            success:function (data) {
                artistCallback(data);
            },
            err:function (data) {
                console.log(data);
            }
        });
    }
    /*更多home图片*/
    var n=0;
    $(".showMoreHome").click(function(){
        n++;
        if(n<=4){
            if(n==4){
                $(".showMoreHome")[0].innerText="收起";
                $(".transHomeImg").css("display","none");
                //console.log($(".showMoreHome"));
            }
            $.ajax({
                type:"get",
                url:"/moreHomeImg.do",
                data:{
                    n:n
                },
                success:function (data) {
                    //console.log(data.length);
                    homeCallback(data);
                },
                err:function (data) {
                    console.log(data);
                }
            });
        }else{
            myHomeLoad();
            $(".showMoreHome")[0].innerText="MORE";
            $(".transHomeImg").css("display","block");
            n=0;
        }
    });
    /*更多Visit图片*/
    var i=0;
    $(".showMoreVisit").click(function(){
        i++;
        if (i > 3) {
            myVisitLoad();
            $(".showMoreVisit")[0].innerText = "MORE";
            $(".transVisitImg").css("display", "block");
            i = 0;
        } else {
            if (i == 3) {
                $(".showMoreVisit")[0].innerText = "收起";
                $(".transVisitImg").css("display", "none");
            }
            $.ajax({
                type: "get",
                url: "/moreVisitImg.do",
                data: {
                    n: i
                },
                success: function (data) {
                    //console.log(data);
                    visitCallback(data);
                },
                err: function (data) {
                    console.log(data);
               }
            });
        }
    });
    /*更多Artist图片*/
    var a=0;
    $(".showMoreArtist").click(function(){
        a++;
        if(a==1){
            $.ajax({
                type: "get",
                url: "/moreArtistImg.do",
                data: {
                },
                success: function (data) {
                    artistCallback(data);
                },
                err: function (data) {
                    console.log(data);
                }
            });
            $(".showMoreArtist")[0].innerText="收起";
            $(".transArtistImg").css("display","none");
        }else{
            a=0;
            $(".showMoreArtist")[0].innerText="MORE";
            $(".transArtistImg").css("display","block");
            myArtistLoad();
        }
    });
});

/*===================调用===========*/
function homeCallback(data){
    $(".fnjihome-list").html("");
    for(var i=0;i<data.length;i++){
        $(".fnjihome-list").html($(".fnjihome-list").html()+"<a href='/fnjihome-detail.do?h_id="+data[i].h_id+"'><li class='myTest'>" +
        "<div class='home-wrapper'>" +
        "<div class='col-s-12 home-cover' style='background-image: url("+data[i].h_img+")'>" +
        "</div>" +
        "<div class='homeNumber'>" +
        ""+data[i].h_number+"<br>" +
        "<span>"+data[i].h_name+"</span>" +
        "</div>" +
        "<div class='homeAddress'>" +
        ""+data[i].h_address+"" +
        "</div>" +
        "<div class='homeTime'>" +
        ""+data[i].h_time.split("T")[0]+"" +
        "</div>" +
        "</div>" +
        "</li></a>");
    }
}
function visitCallback(data){
    //console.log(data.length);
    $(".fnjidrop-list").html("");
    for(var i=0;i<data.length;i++){
        $(".fnjidrop-list").html($(".fnjidrop-list").html()+"<a href='/fnjivisit-detail.do?v_id="+data[i].v_id+"'><li class='myTest'>" +
        "<div class='home-wrapper'>" +
        "<div class='col-s-12 home-cover' style='background-image: url("+data[i].v_imgSrc+")'>" +
        "</div>" +
        "<div class='homeNumber'>" +
        ""+data[i].v_number+"<br>" +
        "<span>"+data[i].v_theme+"</span>" +
        "</div>" +
        "<div class='homeAddress'>" +
        ""+data[i].v_place+"" +
        "</div>" +
        "<div class='homeTime'>" +
        ""+data[i].v_time.split("T")[0]+"" +
        "</div>" +
        "</div>" +
        "</li></a>");
    }
}
function artistCallback(data){
    //console.log(data);
    $(".fnjiartist-list").html("<li>"+
        "<div class='col-s-12 artist-wrapper'>"+
        "<img src='../images/lanmu/Art1.jpg'>"+
        "</div>"+
        "<div class='col-s-12 fourIntro'>"+
        "<p>"+
        "梵几不定期邀请艺术家用[玩]的方式一起打造主题橱窗"+
        "<br>"+
        "它不被定义/是品牌与艺术家的跨界尝试"+
        " <br>"+
        " 相信会给大家带来新鲜有趣的视觉呈现"+
        "<br>"+
        "......"+
        "</p>"+
        "</div>"+
        "</li>"
        );
    for(var i=0;i<data.length;i++){
        $(".fnjiartist-list").html($(".fnjiartist-list").html()+
        "<a href='/fnjiartist-detail.do?a_id="+data[i].a_id+"'><li>"+
        "<div class='artistBro'>"+
        "<img src='"+data[i].a_imgSrc+"' style='width:700px'>"+
        "<div style='text-align: left;'>"+
        "<div style='font-size: 14px; color: rgb(17, 17, 17); padding-bottom: 20px; padding-top: 0px; line-height: 20px;'>"+
        "<br>"+
        ""+data[i].a_theme+""+
        "</div>"+
        "<div style='font-size: 12px;'>"+
        ""+data[i].a_place+""+
        "</div>"+
        "<div style='padding-bottom: 80px; font-size: 12px;'>"+
        ""+data[i].a_time.split("T")[0]+""+
        "</div>"+
        "</div>"+
        "</div>"+
        "</li>")
    }
}
