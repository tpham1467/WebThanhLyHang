const express = require('express');
const router = express.Router();
const multer  = require('multer');
const authMiddleware = require('../app/middlewares/authMiddleware');
const usersController = require('../app/controllers/UsersController')

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, './src/public/uploads')
    },
    filename: function(req, file, cb){
        cb(null,Date.now() + file.originalname) 
    }
})

const upload = multer({
    storage: storage,
    limits:{
        fieldSize: 1024*1025*5
    }
}) 


router.get('/create', usersController.create)
router.post('/store', usersController.store)
router.get('/:id/edit', usersController.edit)
router.post('/handle-form-actions', usersController.handleFormActions)
router.put('/:id', upload.single('avatar'), usersController.update)  
router.patch('/:id/restore', usersController.restore)
router.delete('/:id/force', usersController.forceDestroy)
router.delete('/:id', usersController.destroy)
router.get('/:slug', usersController.show)

module.exports = router
