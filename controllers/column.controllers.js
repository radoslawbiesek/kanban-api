const Column = require('../models/column');
const uuid = require('uuid');

exports.getColumns = (req, res) => {
    Column.find({}).exec((err, columns) => {
        if (err) res.status(500).send(err);
        res.json({ columns });
    });
};

exports.addColumn = (req, res) => {
    const newColumn = new Column({
        column: req.body.column,
        id: uuid(),
        cards: []
    });
    
    newColumn.save((err, saved) => {
        if (err) res.status(500).send(err);
        res.send(saved);
    });
};

exports.removeColumn = (req, res) => {
    Column.findOneAndRemove({ id: req.params.id}, (err, removed) => {
        if (err) res.status(500).send(err);
        // TO DO deleting all cards from column.cards array
        res.send(removed);
    })
};

exports.updateColumn = (req, res) => {
    Column.findOneAndUpdate(
        { id: req.params.id }, { column: req.body.column }, { new: true }, (err, updated) => {
        if (err) res.status(500).send(err);
        res.send(updated);
    });
};