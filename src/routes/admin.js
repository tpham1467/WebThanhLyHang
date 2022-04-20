const express = require('express');
const router = express.Router();

const adminController = require('../app/controllers/AdminController')

router.get('/stored/users', adminController.storedUsers)
router.get('/trash/users', adminController.trashUsers)
router.get('/pending-products', adminController.pendingProducts)
router.get('/deleted-pending-products', adminController.deletedPendingProducts)

module.exports = router
