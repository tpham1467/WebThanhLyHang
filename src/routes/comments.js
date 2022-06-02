const express = require('express');
const router = express.Router();

const commentsController = require('../app/controllers/CommentsCotroller');
const authMiddleware = require('../app/middlewares/authMiddleware');

router.post('/store', commentsController.store);
router.put('/:id/edit', commentsController.edit);
router.delete('/:id/delete', commentsController.destroy);

module.exports = router
