var upAndInsertFiles = function (files) {

    var data = new FormData(),
        i = 0,
        len = files.length,
        xhr;

    data.append('upload', files[0]);
    xhr = new XMLHttpRequest();
    xhr.open('post', '/postimg', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            var info = xhr.responseText;
            var obj = eval('(' + info + ')');
            if (obj.success == true) {
                $("#info").text("上传成功！").addClass("alert-success").show().fadeOut(4000);
                insertImgAsBg(obj.path.original);
                $('#postimg').val(obj.path.original);
            }
            else {
                $("#info").text("上传失败！").addClass("alert-danger").show().fadeOut(5000);
            }

        }
    }
    xhr.send(data);


};

var insertImgAsBg = function (img) {
    $('.amd-content').css("background-image", "url('" + img + "')").css("background-size", "cover");
};


$(function() {
    setTimeout(function(){
        $('.upload-cover').change(function () {
            console.log('adfkjdf');
            if (this.type === 'file' && this.files && this.files.length > 0) {
                upAndInsertFiles(this.files);
            }
            this.value = '';
        });
    },500);
});