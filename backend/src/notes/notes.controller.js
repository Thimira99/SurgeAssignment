//require Note Model
const noteModel = require('./notes.model');

//add Notes
module.exports.addNote = async (req, res) => {
    try {
        const { userId, title, description } = req.body;


        const data = new noteModel({
            userId,
            title,
            description
        });

        const output = await data.save();

        return res.json({
            status: true,
            data: output,
        });
    } catch (error) {
        return res.status(422).json({
            status: false,
            msg: error,
        });
    }
}


//get Notes By given user ID
module.exports.getNotesByUserId = async (req, res) => {
    try {
        const id = req.params.id;

        const output = await noteModel.find({ userId: id });
        return res.json({
            status: true,
            data: output,
        });
    } catch (error) {
        return res.status(422).json({
            status: false,
            msg: error,
        });
    }
}

//delete note by id
module.exports.deleteNoteById = async (req, res) => {
    try {
        const id = req.params.id;
        const output = await noteModel.findByIdAndDelete(id);

        return res.json({
            status: true,
            data: output,
        });
    } catch (error) {
        return res.status(422).json({
            status: false,
            msg: error,
        });
    }
};


//update Note by id
module.exports.updateNoteById = async (req, res) => {
    try {
        const { title, description } = req.body;

        const data = {
            title,
            description
        }

        const output = await noteModel.findByIdAndUpdate(req.params.id, data);

        return res.json({
            status: true,
            data: output,
        });
    } catch (error) {
        return res.status(422).json({
            status: false,
            msg: error,
        });
    }
};

//get Notes By given ID
module.exports.getNotesById = async (req, res) => {
    try {
        const id = req.params.id;

        const output = await noteModel.find({ _id: id });
        return res.json({
            status: true,
            data: output,
        });
    } catch (error) {
        return res.status(422).json({
            status: false,
            msg: error,
        });
    }
}