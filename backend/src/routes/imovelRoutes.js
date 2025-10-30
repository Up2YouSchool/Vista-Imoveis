const express = require('express');
const router = express.Router();
const ImovelController = require('../controllers/imovelController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', ImovelController.listAll);

router.get('/:id', ImovelController.findOne);

router.post('/', authMiddleware, ImovelController.create);

router.patch('/:id', authMiddleware, ImovelController.update);

router.delete('/:id', authMiddleware, ImovelController.delete);

module.exports = router;