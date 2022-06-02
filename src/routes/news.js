const express = require('express');
const router = express.Router();

const newsController = require('../app/controllers/NewsCotroller')
const authMiddleware = require('../app/middlewares/authMiddleware');

router.post('/stored', newsController.create)
router.delete('/:id/delete', newsController.destroy);
router.get('/', authMiddleware, newsController.index)

module.exports = router
