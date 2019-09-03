const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const columnSchema = new Schema({
    column: { type: String, required: true },
    cards: { type: Array, required: true },
    id: { type: String, required: true, unique: true }
});

const Column = mongoose.model('Column', columnSchema);

module.exports = Column;