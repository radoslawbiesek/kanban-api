const Card = require('../models/card');
const uuid = require('uuid');

exports.getCards = (req, res) => {
    Card.find({}).exec((err, cards) => {
        if (err) res.status(500).send(err);
        res.json({ cards });
    })
};

exports.addCard = (req, res) => {
    const { card, label, columnId } = req.body;
    if (!card || !columnId) res.status(400).end();
    const newCard = new Card({
        card: card,
        label: label,
        id: uuid()
    });

    newCard.save((err, saved) => {
        if (err) res.status(500).send(err);
        // TO DO - find column, push card id to column.notes array
        res.send(saved);
    });
};

exports.deleteCard = (req, res) => {
    Card.findOneAndRemove({ id: req.params.id }, (err, removed) => {
        if (err) res.status(500).send(err);
        // TO DO - find column, filter column.notes array
        res.send(removed);
    })
};

exports.updateCard = (req, res) => {
    Card.findOneAndUpdate({ id: req.params.id }, { card: req.body.card }, (err, updated) => {
        if (err) res.status(500).send(err);
        res.send(updated);
    })
};

