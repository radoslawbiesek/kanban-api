const Column = require('../models/column');
const Card = require('../models/card');
const uuid = require('uuid');

exports.getColumns = (req, res) => {
    Column.find()
        .exec()
        .then(columns => res.status(200).send(columns))
        .catch(err => res.status(500).send(err))
};

exports.addColumn = (req, res) => {
    const newColumn = new Column({
        name: req.body.column.name,
        id: uuid(),
        cards: []
    });
    
    newColumn
        .save()
        .then(column => res.status(200).send(column))
        .catch(err => res.status(500).send(err))
};

exports.removeColumn = (req, res) => {
    Column.findOne({ id: req.params.id })
        .exec()
        .then(column => {
            column.cards.forEach(cardId => {
                Card.findOneAndRemove({ id: cardId }).exec();
            });
            column.remove();
        })
        .then(() => res.status(200).end())
        .catch(err => res.status(500).send(err));
};

exports.updateColumn = (req, res) => {
    Column.findOneAndUpdate(
            { id: req.params.id }, 
            { name: req.body.column.name }, 
            { new: true }
        )
        .then(column => res.status(200).send(column))
        .catch(err => res.status(500).send(err));
};