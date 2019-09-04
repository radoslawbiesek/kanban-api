const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cardSchema = new Schema({
    name: { type: String, required: true },
    label: { type: String },
    id: { type: String, required: true, unique: true }
});

const Card = mongoose.model('Card', cardSchema);

module.exports = Card;