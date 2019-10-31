const Contact = require('../models/Contact.js')

const ContactsController = {
  show: (req, res) => {
    res.send(Contact.findById(req.params.id));
  },
  index: (req, res) => {
    res.send(Contact.findAll());

  },
  create: (req, res) => {

  },
  update: (req, res) => {

  },
  delete: (req, res) => {

  },

}

module.exports = ContactsController;
