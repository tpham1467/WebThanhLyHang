
const Product = require('../models/Product')
const { mitipleMongooseToObject, mongooseToObject} = require('../../util/mongoose')
class MeController {
    //[GET] / me/stored/product
    storedProducts(req, res, next){
        console.log(req.cookies.userId);
        let productQuery = Product.find({userId: req.cookies.userId});
        if(req.query.hasOwnProperty('_sort')){
            productQuery = productQuery.sort({
                [req.query.column] : req.query.type,
            })
        }
        Promise.all([productQuery,Product.countDocumentsDeleted()])
            .then(([products, deletedCount]) =>
                res.render('me/storedProducts', {
                    deletedCount,
                    products: mitipleMongooseToObject(products),
                })
            )
            .catch(next);
    }
    //[GET] / me/trash/product
    trashProducts(req, res, next){
        Product.findDeleted({userId: req.cookies.userId})
            .then(products => res.render('me/trashProducts', {
                products: mitipleMongooseToObject(products)
            }))
            .catch(next)
    }
}

module.exports = new MeController;
