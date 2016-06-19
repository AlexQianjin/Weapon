var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.getUsers = function (req, res) {
    var users = {"users":[{"id":1,"name":"Alex"},{"id":2,"name":"Qianjin"}]};
    sendJSONresponse(res, 200, users);
}

module.exports.getUser = function (req, res) {
    var user = {"id":3, "name":"AlexQin"};
    sendJSONresponse(res, 200, user);
}