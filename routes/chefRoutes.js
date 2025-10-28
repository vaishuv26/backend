const express = require('express');
const router = express.Router();
const chefController = require('../controllers/chefController');

router.get('/', chefController.getAllChefs);
router.post('/', chefController.createChef);

module.exports = router;
