const express = require('express');
const router = express.Router();
const tableController = require('../controllers/tableController');

router.get('/', tableController.getTables);
router.post('/', tableController.createTable);
router.delete('/:id', tableController.deleteTable);
router.patch('/reserve/:id', tableController.reserveTable);

module.exports = router;
