var jwt = require('jsonwebtoken')
var config = require('./config.js')

module.exports = {
    login: function(request, reponse) {
        if (request.body.name !== 'admin' && request.body.pws !== '123456') {
            reponse.sendStatus(401).send({'message': '密码或用户名错误'});
            return;
        }
        let content = {name: request.body.name};
        let secretOrPrivateKey = config.secrets;
        let token = jwt.sign(content, secretOrPrivateKey, {expiresIn: 60*60*1});
        reponse
        .sendStatus(200)
        .send({
            'message': 'success',
            'token': token, 
            'user': {
                'id': 'aaasc-3f56c-12dcf-12vt7',
                'name': 'zhangsan',
                'role': 0
            }
        });
    }
}
    