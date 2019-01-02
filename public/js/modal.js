/**
 * Created by TLSY0001 on 2018/11/1.
 */
// <!--设置输入框获得焦点和失去焦点样式-->
$(document).ready(function(){
    $("input").focus(function(){
        $("input").css("border-bottom","1px solid #000000");
    });
    $("input").blur(function(){
        $("input").css("border-bottom","1px solid #D5D5D5");
    });
});
function openMotai(){
    $("#editname").modal({backdrop: 'static', keyboard: false});  //手动开启
}

/* 使模态框垂直居中 */
function centerModals() {
    $('#editname').each(function(i) {
        var $clone = $(this).clone().css('display', 'block').appendTo('body'); var top = Math.round(($clone.height() - $clone.find('.modal-maincontent').height()) / 2);
        top = top > 0 ? top : 0;
        $clone.remove();
        $(this).find('.modal-maincontent').css("margin-top", top);
    });
}
$('#editname').on('show.bs.modal', centerModals);
$(window).on('resize', centerModals);

// 模拟城市-联动/搜索/键盘操作
/*var selector3 = $('#city-picker-search').cityPicker({
    dataJson: cityData,
    renderMode: true,
    search: true,
    autoSelected: true,
    keyboard: true,
    level: 3,
    onChoiceEnd: function () {
        console.log(this.values)
    }
});*/

