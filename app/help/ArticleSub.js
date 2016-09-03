
var br = {};
br.spTags = ["img","br","hr"];/*不需要成对出现的标记*/
br.contain = function(arr,it){
    for(var i=0,len=arr.length;i<len;i++){
        if(arr[i]==it){
            return true;
        }
    }
    return false;
}
br.subArtc = function(article,worldNum){
    var result = [];
    /*首先截取需要的字串*/
    var wcount = 0;
    var startTags = [],endTags = [];
    var isInTag = false;
    for(var i=0,len=article.length;i<len;i++){
        var w = article[i];
        result.push(w);
        if(w=="<"){
            isInTag = true;
        }
        if(!isInTag){
            wcount++;
            if(wcount==worldNum){
                break;
            }
        }
        if(w==">"){
            isInTag = false;
        }
    }
    /*对字串进行处理*/
    var j=0;
    isInTag = false;
    var isStartTag = true;
    var tagTemp = "";
    while(j<i){
        w = result[j];
        if(isInTag){
            if(w==">" || w==" " || w=="/"){
                isInTag = false;
                if(isStartTag){
                    startTags.push(tagTemp);
                }else{
                    endTags.push(tagTemp);
                }
                tagTemp = "";
            }
            if(isInTag){
                tagTemp+=w;
            }
        }
        if(w=="<"){
            isInTag = true;
            if(result[j+1]=="/"){
                isStartTag = false;
                j++;
            }else{
                isStartTag = true;
            }
        }
        j++;
    }
    /*剔除img,br等不需要成对出现的标记*/
    var newStartTags = [];
    for(var x=0,len=startTags.length;x<len;x++){
        if(!br.contain(br.spTags,startTags[x])){
            newStartTags.push(startTags[x]);
        }
    }
    /*添加没有的结束标记*/
    var unEndTagsCount = newStartTags.length - endTags.length;
    while(unEndTagsCount>0){
        result.push("<");
        result.push("/")
        result.push(newStartTags[unEndTagsCount-1]);
        result.push(">");
        unEndTagsCount--;
    }
    return result.join("");
};

module.exports=br;