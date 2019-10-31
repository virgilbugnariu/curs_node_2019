const express = require('express');
const contactsController = require('./controllers/ContactsController.js');

const router = express.Router();

router.get('/contacts', contactsController.index);
router.post('/contacts', contactsController.create);
router.get('/contacts/:id', contactsController.show);
router.put('/contacts/:id', contactsController.update);
router.delete('/contacts/:id', contactsController.delete);

module.exports = router;
