/**
 * Created with JetBrains WebStorm.
 * User: 灵勇
 * Date: 13-7-27
 * Time: 下午10:01
 * To change this template use File | Settings | File Templates.
 */
$(function(){

    $("#info").hide();
    function initToolbarBootstrapBindings() {
        var fonts = ['Serif', 'Sans', 'Arial', 'Arial Black', 'Courier',
                'Courier New', 'Comic Sans MS', 'Helvetica', 'Impact', 'Lucida Grande', 'Lucida Sans', 'Tahoma', 'Times',
                'Times New Roman', 'Verdana'],
            fontTarget = $('[title=Font]').siblings('.dropdown-menu');
        $.each(fonts, function (idx, fontName) {
            fontTarget.append($('<li><a data-edit="fontName ' + fontName +'" style="font-family:\''+ fontName +'\'">'+fontName + '</a></li>'));
        });
        $('a[title]').tooltip({container:'body'});
        $('.dropdown-menu input').click(function() {return false;})
            .change(function () {$(this).parent('.dropdown-menu').siblings('.dropdown-toggle').dropdown('toggle');})
            .keydown('esc', function () {this.value='';$(this).change();});

        $('[data-role=magic-overlay]').each(function () {
            var overlay = $(this), target = $(overlay.data('target'));
            overlay.css('opacity', 0).css('position', 'absolute').offset(target.offset()).width(target.outerWidth()).height(target.outerHeight());
        });
        $('#voiceBtn').hide();
        // if ("onwebkitspeechchange"  in document.createElement("input")) {
        //   var editorOffset = $('#editor').offset();
        //   $('#voiceBtn').css('position','absolute').offset({top: editorOffset.top, left: editorOffset.left+$('#editor').innerWidth()-35});
        // } else {
        //   $('#voiceBtn').hide();
        // }
    };
    initToolbarBootstrapBindings();
    $('#editor').wysiwyg();

    function divEscapedContentElement(message) {
        return $('<div></div>').text(message);
    }



    $('#post').click(
       function(){
           var content=  $('#editor').html(),
               title=$('#tittle').val().trim(),
               tags=[{}];

           $('.tagItem').each(function(index){
               var tag=$(this).val().trim()
               if(tag!=="")
                    tags.push({tag:tag,id:index+1});
           });

           var url=window.location.pathname;
           $.ajax({
               type:'post',
               url:url,
               data:{content:content,title:title,tags:tags},
               dataType:'json',
               success:function(data,status,jqxhr){
                   if(data.success==true)
                   {

                       if($('#post').data("rol")=="edit")
                       {
                           $("#info").text("保存成功！").addClass("alert-success").show().fadeOut(4000);
                       }
                       else{
                           window.location.pathname='blog';
                       }

                   }
                   else{
                       if(data.err)
                       {
                           errs=data.err;
                           var message='';
                            for(var i=0;i<errs.length;i++)
                           {
                               message+=errs[i].msg.toString()+"   ";

                           }
                           $("#info").text(message).addClass("alert-danger").show().fadeOut(5000);

                       }
                       else
                       $("#info").text("保存失败！").addClass("alert-danger").show().fadeOut(5000);
                   }

               }

           });
       }
    );

});