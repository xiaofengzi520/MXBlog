/**
 * Created with JetBrains WebStorm.
 * User: 灵勇
 * Date: 13-8-5
 * Time: 下午8:59
 * To change this template use File | Settings | File Templates.
 */


$('.get-ten').click(function(){
         $(this).button('loading');
         var page;
         page=$(this).data('page');

         $.ajax({
         type:'GET',
         url:'/getBlogPerpage',
         data:{page:page},
         dataType:'json',
         timeout:function(){
             $('.get-ten').button('reset');
         }   ,
         complete:function(jqxhr,status){
             $('.get-ten').button('reset');
         }  ,
         success:function(data,status,jqxhr){
             if(data.blogs.length>0)
             {

                $('.get-ten').data('page',page+1);

             }

             for(var i=0;i<data.blogs.length;i++)
             {

                      var html="<div class=\"blog-each\"><h3><a href=\"/blog/"+data.blogs[i]._id.toString()+"\" class=\"blog-title\">"+
                     data.blogs[i].title.toString()+
                     "</a></h3><div class=\"blog-content\">"+
                     data.blogs[i].contentBegin.toString()+
                     "</div><div class=\"blog-content-footer\"><span>"+
                     data.blogs[i].time.day+"</span></div></div>";
                     $('.blog-wrapper').append(html).fadeIn(5000);
             }
             if(data.isLastPage)
             {
                 $('.get-ten').fadeOut(2000);
             }
         }

     })  ;
 });


