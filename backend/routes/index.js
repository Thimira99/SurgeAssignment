// create router
const express = require('express');

const router = express.Router();

router.use(express.urlencoded({ extended: true }));
router.use(express.json({ limit: '50mb' }));
router.use(express.json());
router.use(express.text({ limit: '50mb', type: '*/xml' }));

// set user routes
router.use('/users', require('../src/users/users.router'));

// set notes router
router.use('/notes', require('../src/notes/notes.router'));

module.exports = router;
