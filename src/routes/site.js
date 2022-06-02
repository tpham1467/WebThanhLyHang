const express = require('express');
const router = express.Router();
const authMiddleware = require('../app/middlewares/authMiddleware');
const DTO = require('../app/middlewares/DTO');

const siteController = require('../app/controllers/SiteCotroller')

router.get('/search', siteController.Search)
router.get('/categories/:slug', siteController.CategoryFilter)
router.get('/', authMiddleware, siteController.index)

module.exports = router
