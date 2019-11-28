const jwt = require('jsonwebtoken');
const config = require('../config.js');

module.exports = function(req, res, next) {
  if(
    !req.headers.authorization
  ) {
    res.send({
      error: "sorry, you need to be logged in",
    });
    next();
  }

  jwt.verify(req.headers.authorization, config.JWTSECRET, (err, data) => {
    if (err) {
      res.send({
        error: "Authentication error",
      });
    }
    next();
  });
};
