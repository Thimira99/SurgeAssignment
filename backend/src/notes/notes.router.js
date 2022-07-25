const express = require('express');
const { addNote, getNotesById, deleteNoteById, updateNoteById } = require('./notes.controller');

// user router
const router = express.Router();

//add Notes
router.route('/add').post(addNote);

//get Notes By Id
router.route('/getById/:id').get(getNotesById);

//delete notes by id
router.route('/deleteById/:id').delete(deleteNoteById);

//update notes by id
router.route('/updateById/:id').put(updateNoteById);

module.exports = router;