// <!--点击左边的内容，进行切换-->
var navul=document.getElementsByClassName("navul")[0];
var navli=navul.getElementsByTagName("li");
var rightdiv=document.getElementsByClassName("rightdiv")[0];
var rdivs=rightdiv.getElementsByClassName("members");
var index=3;
for(var i=0;i<navli.length-1;i++){
    navli[i].firstChild.style.color="#575757";
    rdivs[i].style.opacity=0;
    rdivs[i].style.zIndex=1;
}
navli[index].firstChild.style.color="#ffffff";
rdivs[index].style.opacity=1;
rdivs[index].style.zIndex=2;
function btnthis(obj) {
    for(var i=0;i<navli.length-1;i++){
        navli[i].firstChild.style.color="#575757";
        rdivs[i].style.opacity=0;
        rdivs[i].style.zIndex=1;
    }
    var index1=(obj.offsetTop-214)/58;
    index=parseInt(index1);
    navli[index].firstChild.style.color="#ffffff";
    rdivs[index].style.opacity=1;
    rdivs[index].style.zIndex=3;
}

//    切换结束
//模态框设置
//开启模态框，使它点外面时也不消失
function openMotai(){
    $("#editname").modal({backdrop: 'static', keyboard: false});  //手动开启
}
function openMotai1(){
    $("#editpwd").modal({backdrop: 'static', keyboard: false});  //手动开启
}
function openMotai2(){
    $("#editphone").modal({backdrop: 'static', keyboard: false});  //手动开启
}
function openMotai3(){
    $("#editemail").modal({backdrop: 'static', keyboard: false});  //手动开启
}
function openMotai4(){
    $("#addAddress").modal({backdrop: 'static', keyboard: false});  //手动开启
}
function openMotai5(){
    $("#editAddress").modal({backdrop: 'static', keyboard: false});  //手动开启
}
function openMotai6(){
    $("#deleteAddress").modal({backdrop: 'static', keyboard: false});  //手动开启
}

/* 使模态框垂直居中 */
function centerModals() {
    $('#editname').each(function(i) {
        var $clone = $(this).clone().css('display', 'block').appendTo('body');
        var top = Math.round(($clone.height() - $clone.find('.modal-maincontent').height()) / 2);
        top = top > 0 ? top : 0;
        $clone.remove();
        $(this).find('.modal-maincontent').css("margin-top", top);
    });
}
$('#editname').on('show.bs.modal', centerModals);
$(window).on('resize', centerModals);
function centerModals1() {
    $('#editpwd').each(function(i) {
        var $clone = $(this).clone().css('display', 'block').appendTo('body');
        var top = Math.round(($clone.height() - $clone.find('.modal-maincontent').height()) / 2);
        top = top > 0 ? top : 0;
        $clone.remove();
        $(this).find('.modal-maincontent').css("margin-top", top);
    });
}
$('#editpwd').on('show.bs.modal', centerModals1);
$(window).on('resize', centerModals1);
function centerModals2() {
    $('#editemail').each(function(i) {
        var $clone = $(this).clone().css('display', 'block').appendTo('body');
        var top = Math.round(($clone.height() - $clone.find('.modal-maincontent').height()) / 2);
        top = top > 0 ? top : 0;
        $clone.remove();
        $(this).find('.modal-maincontent').css("margin-top", top);
    });
}
$('#editemail').on('show.bs.modal', centerModals2);
$(window).on('resize', centerModals2);
function centerModals3() {
    $('#editphone').each(function(i) {
        var $clone = $(this).clone().css('display', 'block').appendTo('body');
        var top = Math.round(($clone.height() - $clone.find('.modal-maincontent').height()) / 2);
        top = top > 0 ? top : 0;
        $clone.remove();
        $(this).find('.modal-maincontent').css("margin-top", top);
    });
}
$('#editphone').on('show.bs.modal', centerModals3);
$(window).on('resize', centerModals3);
function centerModals4() {
    $('#addAddress').each(function(i) {
        var $clone = $(this).clone().css('display', 'block').appendTo('body');
        var top = Math.round(($clone.height() - $clone.find('.modal-maincontent').height()) / 2);
        top = top > 0 ? top : 0;
        $clone.remove();
        $(this).find('.modal-maincontent').css("margin-top", top);
    });
}
$('#addAddress').on('show.bs.modal', centerModals4);
$(window).on('resize', centerModals4);
function centerModals5() {
    $('#editAddress').each(function(i) {
        var $clone = $(this).clone().css('display', 'block').appendTo('body');
        var top = Math.round(($clone.height() - $clone.find('.modal-maincontent').height()) / 2);
        top = top > 0 ? top : 0;
        $clone.remove();
        $(this).find('.modal-maincontent').css("margin-top", top);
    });
}
$('#editAddress').on('show.bs.modal', centerModals5);
$(window).on('resize', centerModals5);

function centerModals6() {
    $('#deleteAddress').each(function(i) {
        var $clone = $(this).clone().css('display', 'block').appendTo('body');
        var top = Math.round(($clone.height() - $clone.find('.modal-maincontent').height()) / 2);
        top = top > 0 ? top : 0;
        $clone.remove();
        $(this).find('.modal-maincontent').css("margin-top", top);
    });
}
$('#deleteAddress').on('show.bs.modal', centerModals6);
$(window).on('resize', centerModals6);
// 模拟城市-联动/搜索/键盘操作
var selector3 = $('#city-picker-search').cityPicker({
    dataJson: cityData,
    renderMode: true,
    search: true,
    autoSelected: true,
    keyboard: true,
    level: 3,
    onChoiceEnd: function () {
        console.log(this.values)
    }
});