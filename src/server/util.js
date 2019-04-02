var fs = require('fs')

module.exports = {
    writeImg (myfileBlob, path) {
        let fileBlob = myfileBlob.replace(/^data:image\/\w+;base64,/, "");//去掉图片base64码前面部分data:image/png;base64
        let dataBuffer = Buffer.from(fileBlob, 'base64'); //把base64码转成buffer对象，
        fs.writeFile(path, dataBuffer, "binary", function(err){//用fs写入文件
            if(err){
                console.error(err);
            }else{
               console.log('写入成功！');
            }
        });
    }
}