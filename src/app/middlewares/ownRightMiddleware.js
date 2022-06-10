const User = require('../models/User')
const Category = require('../models/Category')
const Product = require('../models/Product')
const OrderDetail = require('../models/OrderDetail')
const { mitipleMongooseToObject, mongooseToObject} = require('../../util/mongoose')

module.exports = function requirePermission(req, res, next) {
    
    if(res.locals.user.slug ==  req.params.slug) {
        res.locals.hasRight = true;
    }
    
    next();
}