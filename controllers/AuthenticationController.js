
const config = require('../config');
const models = require('../models');
const jwt = require('jsonwebtoken');

const messages = {
  unauthorized: 'Credentials are not valid',
}

const AuthenticationController = {
  /* 
    Citim din body-ul request-ului campurile email si password.
    Facem o cautare in baza de date dupa aceste date.
    Daca exista, generam un token JWT folosind cheia secreta definita in config.
  */
  login: (req, res) => {
    const body = req.body;
    const providedEmail = body.email;
    const providedPassword = body.password;

    models
      .User
      .findAll({
        where: {
          email: providedEmail,
          password: providedPassword,
        }
      })
      .then(data => {
        if (data.length) {
          // Returnam aici pentru a opri executia scriptului
          return jwt.sign({}, config.JWTSECRET, (err, token) => {
            return res.send({
              token: token,
            });
          });
        }

        res
          .status(401)
          .send({
            error: messages.unauthorized,
          });
      })
  },
  // Acesta era un endpoint de test pentru a demonstra validarea token-ului.
  // Aceasta se face acum in interiorul middleware-ului de autentificare (middlewares/authentication.js)

  // verify: (req, res) => {
  //   const body = req.body;
  //   const token = body.token;

  //   jwt.verify(token, config.JWTSECRET, (err, data) => {
  //     if (err) {
  //       res.send({
  //         isValid: false,
  //       });
  //     } else {
  //       res.send({
  //         isValid: true,
  //       })
  //     }
  //   });
  // }
};

module.exports = AuthenticationController;
