const mongoose = require('mongoose');

//define schema (structure of Rec)
const recSchema = new mongoose.Schema({
    category: { type: String, required: true, enum: ['Movie', 'Book', 'Location', 'Activity', 'Music', 'App'] },
    title: { type: String, required: true },
    description: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

//create and export user model based on schema
module.exports = mongoose.model('Rec', recSchema);