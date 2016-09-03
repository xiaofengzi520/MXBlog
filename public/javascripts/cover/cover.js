
$(".covers").gridalicious({
    animate: true,
    width:200,
    gutter:0,
    selector:'.cover',
    animationOptions: {
        queue: true,
        speed: 200,
        duration: 300,
        effect: 'fadeInOnAppear'



    }
});


if($(window).width()>768){

    $('.cover a').hover(function(){
            $(this).children(".comment-box").removeClass('hidden');
        },
        function(){
            $(this).children(".comment-box").addClass("hidden");
        }
    );
}


