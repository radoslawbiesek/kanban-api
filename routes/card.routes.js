const Router = require('express').Router;
const CardController = require('../controllers/card.controller');

const router = new Router();

router.route('/cards').get(CardController.getCards);
router.route('/cards').post(CardController.addCard);
router.route('/cards/:id').delete(CardController.deleteCard);
router.route('/cards/:id').put(CardController.updateCard);

module.exports = router;