const db = {
  contacts: [
    {
      id: 0,
      name: 'Andrei Popescu',
      phoneNumber: '0736123123',
    },
    {
      id: 1,
      name: 'Ioana Popescu',
      phoneNumber: '0736123323',
    },
    {
      id: 2,
      name: 'Ionel Popescu',
      phoneNumber: '0736163123',
    },
  ]
};

const Contact = {
  findAll: () => {
    return db.contacts;
  },
  findById: (stringId) => {
    const id = parseInt(stringId, 10);
    return db.contacts.filter(contact => contact.id === id);
  }
}

module.exports = Contact;
