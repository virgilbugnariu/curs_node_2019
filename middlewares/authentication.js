const jwt = require('jsonwebtoken');
const config = require('../config.js');

// Putem stoca mesajele de eroare intr-un obiect pentru a nu fi
// nevoiti sa le rescriem
const messages = {
  unauthorized: 'You are not authorized to access this resource',
}

module.exports = function(req, res, next) {
  /* In middleware avem acces la obiectele req (request) si res (response).
     Aici putem intercepta si modifica raspunsul primit de client.

     Verificam daca exista header-ul `Authorization`. Daca nu exista, raspundem cu 
     mesaj de eroare si status code specific acestei erori (401 Unauthorized)
  */
  if(!req.headers.authorization) {
    res.status(401).send({
      error: messages.unauthorized,
    });
  } else {
    /*
        Daca exista header-ul `Authorization`, folosim metoda .verify() din libraria `jsonwebtoken`
        pentru a verifica daca token-ul este valid.
        Aceasta primeste ca argumente:
        1. Token-ul ce urmeaza a fi validat
        2. JWTSecret - cheia folosita pentru criptare si decriptare.
        3. Callback-ul ce urmeaza a fi executat atunci cand token-ul a fost verificat
    */
    
    /* 
      Stergem `Bearer` din string-ul primit pe header.
      Conform standardului, `Bearer` trebuie sa fie in header
      insa pentru verificarea token-ului nu avem nevoie de el.
      Mai multe informatii: https://security.stackexchange.com/a/120244
    */
    const tokenToVerify = req.headers.authorization.replace('Bearer ', '');
    jwt.verify(tokenToVerify, config.JWTSECRET, (err, data) => {
      if (err) {
        // Token-ul nu este valid deci raspundem clientului cu un mesaj de eroare si status code
        res.status(401).send({
          error: messages.unauthorized,
        });
      } else {
        // Token-ul este valid deci request-ul poate continua. Apeland functia next() notificam 
        // framework-ul ca poate trece la urmatorul middleware din chain.
        next();
      }
    });
  }
};
