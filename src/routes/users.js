const express = require('express');
const router = express.Router();
const multer  = require('multer');
const authMiddleware = require('../app/middlewares/authMiddleware');
const usersController = require('../app/controllers/UsersController')

router.get('/create', usersController.create)
router.post('/store', usersController.store)
router.get('/:id/edit', usersController.edit)
router.post('/handle-form-actions', usersController.handleFormActions)
router.put('/:id', usersController.update)  
router.patch('/:id/restore', usersController.restore)
router.delete('/:id/force', usersController.forceDestroy)
router.delete('/:id', usersController.destroy)
router.get('/:slug', usersController.show)

module.exports = router
