
const config = require('../config');
const models = require('../models');
const jwt = require('jsonwebtoken');

const AuthenticationController = {
  login: (req, res) => {
    const body = req.body;
    const providedUsername = body.username;
    const providedPassword = body.password;

    if(
      providedUsername === 'admin' &&
      providedPassword === 'password123'
    ) {
      jwt.sign({}, config.JWTSECRET, (err, token) => {
        res.send({
          token: token,
        });
      });
    } else {
      res.send({
        error: true,
      });
    }
  },
  verify: (req, res) => {
    const body = req.body;
    const token = body.token;

    jwt.verify(token, KEY, (err, data) => {
      if (err) {
        res.send({
          isValid: false,
        });
      } else {
        res.send({
          isValid: true,
        })
      }
    });
  }
};

module.exports = AuthenticationController;
