const Card = require('../models/card');
const Column = require('../models/column');
const uuid = require('uuid');

exports.getCards = (req, res) => {
    Card.find()
        .exec()
        .then(cards => res.status(200).json(cards))
        .catch(err => res.status(500).json(err));
};

exports.addCard = (req, res) => {
    const { name, label, columnId } = req.body.card;
    const cardId = uuid();
    if (!name || !columnId) res.status(400).end();
    const newCard = new Card({
        name: name,
        label: label,
        id: cardId
    });

    newCard
        .save()
        .then(() => Column.findOne({ id: columnId })
        .then(column => {
            column.cards.push(cardId);
            column.save();
        })
        .then(() => res.status(200).json(newCard))
        .catch(err => res.status(500).json(err)));
};

exports.deleteCard = (req, res) => {
    cardId = req.params.id;

    Column.findOne({ cards: { $in: cardId }})
        .exec()
        .then(column => {
            filteredCards = column.cards.filter(id => id !== cardId);
            column.cards = filteredCards;
            column.save();
        })
        .then(() => Card.findOne({ id: cardId }))
        .then(card => card.remove())
        .then(() => res.status(200).end())
        .catch(err => res.status(500).send(err));
 };

exports.updateCard = (req, res) => {
    const { name, columnId } = req.body.card;

    Card.findOneAndUpdate(
        { id: req.params.id }, 
        { name: name }, 
        { new: true }
    )
        .exec()
        .then(updated => res.status(200).send(updated))
        .catch(err => res.status(500).send(err));
        // TO DO delete card from old column and add to the new
};

