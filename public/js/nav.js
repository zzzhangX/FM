
/*中部一级导航*/
$(".mainContent .mainContentNav>ul>li").on("mouseover",function () {
    $(this).css({
        "overflow":"visible"
    }).children().eq(0).css({
        "color":"#505050",
        "border-bottom":"2px solid black"
    })
});
$(".mainContent .mainContentNav>ul>li").on("mouseout",function () {
    $(this).css({
        "overflow":"hidden"
    }).children().eq(0).css({
        "color":"#a1a1a1",
        "border-bottom":"2px solid transparent"
    })
});
/*中部二级导航*/
$(".mainContent>.mainContentNav>ul>li>ul>li>a").on("mouseover",function () {
    $(this).css({
        "color":"#505050"
    })
});
$(".mainContent>.mainContentNav>ul>li>ul>li>a").on("mouseout",function () {
    $(this).css({
        "color":"#a1a1a1",
    })
});


