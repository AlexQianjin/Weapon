var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = '2vdbhs4Gttb2';

module.exports = {
    sendJSONresponse: function (res, status, content) {
        res.status(status);
        res.json(content);
    },
    encrypt: function (text) {
        var cipher = crypto.createCipher(algorithm, password)
        var crypted = cipher.update(text, 'utf8', 'hex')
        crypted += cipher.final('hex');
        return crypted;
    },
    decrypt: function (text) {
        var decipher = crypto.createDecipher(algorithm, password)
        var dec = decipher.update(text, 'hex', 'utf8')
        dec += decipher.final('utf8');
        return dec;
    }
};