const express = require('express');
const router = express.Router();
const CorretorController = require('../controllers/corretorController');

router.post('/', CorretorController.create);

router.post('/login', CorretorController.login);

module.exports = router;