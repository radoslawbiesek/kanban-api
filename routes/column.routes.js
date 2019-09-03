const Router = require('express').Router;
const ColumnController = require('../controllers/column.controllers');

const router = new Router();

router.route('/column').get(ColumnController.getColumns);
router.route('/column').post(ColumnController.addColumn);
router.route('/column/:id').delete(ColumnController.removeColumn);
router.route('/column/:id').put(ColumnController.updateColumn);

module.exports = router;

