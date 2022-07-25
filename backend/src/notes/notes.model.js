// import mongoose
const { Schema, model, default: mongoose } = require('mongoose');

const model_name = 'note';

const schema = new Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: false,
            ref: "user"
        },
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        }
    },
    { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

const noteModel = model(model_name, schema);
module.exports = noteModel;