const User = require('../models/User')
const Category = require('../models/Category')
const Product = require('../models/Product')
const OrderDetail = require('../models/OrderDetail')
const { mitipleMongooseToObject, mongooseToObject} = require('../../util/mongoose')

module.exports = function DTO(req, res, next) {
    OrderDetail.find({UserId: req.cookies.userId}, function(err, orders){
        if(orders){
            const arr = [];
            orders.forEach(order => arr.push(order.productId));
                Product.find({_id: {$in: arr}}, function (err, cartItems) {
                    if(cartItems)
                        res.locals.cartItems = mitipleMongooseToObject(cartItems);
                })
        }
    })
    //muon tam ham de do du lieu vao header
    Category.find({}, function(err, categories){
        if(categories){
            res.locals.categories = mitipleMongooseToObject(categories)
        }
    })
    next();
}