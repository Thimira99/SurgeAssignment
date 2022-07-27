const shortid = require('shortid');

const admins = [
    {
        firstName: 'Saman',
        lastName: 'Samarakoon',
        email: 'damithamewan201@gmail.com',
        mobile: '0768765333',
        accountType: 'admin',
        dateOfBirth: '1999-07-5',
        password: shortid.generate(),
    },
    {
        firstName: 'Nisal',
        lastName: 'Nanayakkara',
        email: 'nisal@gmail.com',
        mobile: '0768765333',
        accountType: 'admin',
        dateOfBirth: '1999-07-5',
        password: shortid.generate(),
    },
];

module.exports = admins;
