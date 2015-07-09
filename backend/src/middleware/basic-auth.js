require('dotenv').load()

var basicAuth = require('basic-auth')

module.exports = function (req, res, next) {
  function unauthorized(res) {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    return res.send(401);
  };

  var user = basicAuth(req);

  if (!user || !user.name || !user.pass) {
    return unauthorized(res);
  };

  if (user.name === process.env.ADMIN_USERNAME &&
      user.pass === process.env.ADMIN_PASSWORD) {
    return next();
  } else {
    return unauthorized(res);
  };
}
