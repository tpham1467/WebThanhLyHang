const express = require('express');
const router = express.Router();
const authMiddleware = require('../app/middlewares/authMiddleware');

const siteController = require('../app/controllers/SiteCotroller')

router.get('/search', siteController.Search)
router.get('/categories/:slug', siteController.CategoryFilter)
router.get('/', siteController.index)

module.exports = router
