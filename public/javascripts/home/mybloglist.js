
 $('.delete').click(function(){
     if(confirm("Are you sure to Delete？"))
     {
         var id=$(this).data('id');
         var thisblog=$(this).parent().parent().parent();
         if($(this).data('cmd')=="blog")
         {
             remove('/deleteblog',id,thisblog);
         }
         if($(this).data('cmd')=="cover"){
             remove('/deletecover',id,thisblog);
         }
     }


 });
$(".gettopcover").click(function(){
    var id=$(this).data('id');
    var node=$(this);
    var istop;
    if($(this).data("istop"))
    {
        istop=false;
    }
    else{
        istop=true;
    }
    url='/settopcover'
    dotop(id,istop,node,url);
});

 $(".gettopblog").click(function(){
     var id=$(this).data('id');
     var node=$(this);
     var istop;
     if($(this).data("istop"))
     {
         istop=false;
     }
     else{
         istop=true;
     }
     url='/settopblog'
     dotop(id,istop,node,url);
 });
 function dotop(id,istop,node,url){
     $.ajax({
         type:'get',
         url:url,
         data:{id:id,istop:istop},
         dataType:'json',
         success:function(data,status,jqxhr){
             if(data.success==true)
             {
                 if(istop)
                 {
                     node.html("UnTop");
                 }
                 else{
                     node.html("Top");
                 }
                 node.data("istop",istop);


             }
             else{
                 alert("Fail！");
             }

         }

     });
 }

function remove(url,id,node){
    $.ajax({
        type:'get',
        url:url,
        data:{id:id},
        dataType:'json',
        success:function(data,status,jqxhr){
            if(data.success==true)
            {
                node.fadeOut(500);
            }
            else{
                alert("Fail！");
            }

        }

    });

}


