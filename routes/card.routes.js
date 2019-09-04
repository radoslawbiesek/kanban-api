const Router = require('express').Router;
const CardController = require('../controllers/card.controller');

const router = new Router();

router.route('/card').get(CardController.getCards);
router.route('/card').post(CardController.addCard);
router.route('/card/:id').delete(CardController.deleteCard);
router.route('/card/:id').put(CardController.updateCard);

module.exports = router;