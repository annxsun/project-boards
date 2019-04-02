var jwt = require('jsonwebtoken')
var Mock = require('mockjs');
var config = require('../config.js')
var util = require('../util.js')

var users = [{
    "id": Mock.Random.guid(),
    "name": 'admin',
    "pws": '123456',
    "avatarUrl": 'http://localhost:4000/public/pic/avatar/1554104358306.png'
},{
    "id": "#JKSDK0A",
    "name": "xsun28",
    "pws": '123456',
    "avatarUrl": "http://localhost:4000/public/pic/avatar/1554104358306.png"
},{
    "id": "#JKsqa0A",
    "name": "xwei24",
    "pws": '123456',
    "avatarUrl": "http://localhost:4000/public/pic/avatar/1554104358306.png"
}]

module.exports = {
    userList: function(request, reponse) {
        let userList = [];
        users.forEach(res => {
            let {id, name, avatarUrl} = {...res};
            userList.push({id, name, avatarUrl})
        });
        reponse
        .send({
            'userList': userList,
        });

    },
    login: function(request, reponse) {
        let index = users.findIndex(res => { return res.name === request.body.name });
        if(index === -1) {
            reponse.status(401).send({'message': '密码或用户名错误'});
            return;
        }
        if(users[index].pws !== request.body.pws) {
            reponse.status(401).send({'message': '密码或用户名错误'});
            return
        }
        let content = {name: request.body.name};
        let secretOrPrivateKey = config.secrets;
        let token = jwt.sign(content, secretOrPrivateKey, {expiresIn: 60*60*1});
        let {id, name, avatarUrl} = {...users[index]};
        reponse
        .status(200)
        .send({
            'message': 'success',
            'token': token, 
            'user': {id, name, avatarUrl}
        });
    },
    register: function(request, reponse) {
        let content = request.body.fileBlob;
        let user = {
            id: Mock.Random.guid(),
            name: request.body.name,
            pws: request.body.pws,
            avatarUrl: ''
        }
        if (content) {
            let path = config.pic.avatar + (new Date().getTime()) + '.png';
            user.avatarUrl = config.server + path;
            util.writeImg(content, path);
        }
        users.push(user)
        reponse.sendStatus(200);
    },
  
}
    