/**
 * Created with JetBrains WebStorm.
 * User: 灵勇
 * Date: 13-8-8
 * Time: 下午9:42
 * To change this template use File | Settings | File Templates.
 */
$(".tags").gridalicious({
    animate: true,
    width:220,
    gutter:0,
    selector:'.tag',
    animationOptions: {
        queue: true,
        speed: 200,
        duration: 300,
        effect: 'fadeInOnAppear'
    }
});

if($(window).width()>768){
    $('.tag').hover(function(){
            $(this).children().children('.count').removeClass("hidden");

        },
        function(){
            $(this).children().children(".count").addClass("hidden");
        })  ;
}


/*
$(".blog").hide();
$('.tag').hover(function(){
    $(this).children(".blog").show(500);
},
    function(){

    $(this).children(".blog").hide();
})*/

/* $(function(){

 $("body").append("<div id='main_bg'></div>");
 $("#main_bg").append("<img src='/images/0113.jpg' id='bigpic'>");
 cover();
 $(window).resize(function(){ //浏览器窗口变化
 cover();
 });
 });
 function cover(){
 var win_width = $(window).width();
 var win_height = $(window).height();
 $("#bigpic").attr({width:win_width,height:win_height});
 }*/
