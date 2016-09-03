
$(function(){
    cover();
});
function cover(){
    var win_width = $(window).width();
    var win_height = $(window).height();
    $(".formwrapper").attr({width:win_width,height:win_height});
}
