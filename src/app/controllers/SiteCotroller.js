
const Product = require('../models/Product')
const { mitipleMongooseToObject, mongooseToObject} = require('../../util/mongoose')
class SiteController {
    //[GET] /
    index(req, res, next){
        if(req.query.hasOwnProperty('logout')){
            res.clearCookie('userId', {path: '/'});
            res.redirect('/auth/login');
        }
        let productQuery = Product.find({isChecked: true})
        if(req.query.hasOwnProperty('_sort')){
            productQuery = productQuery.sort({
                [req.query.column] : req.query.type,
            })
        }
        var page = parseInt(req.query.page) || 1
        var perPage = 8
        var start = (page - 1) * perPage
        var end = page * perPage
        Promise.all([productQuery,Product.countDocuments()])
        .then(([products, productsCount]) =>
            res.render('home', {
                productsCount,
                products: mitipleMongooseToObject(products).slice(start, end),
            })
        )
        .catch(next);
        // res.render('home')
    }
    // [GET] /Search
    Search(req, res, next){
        console.log(req.query.q);
        Product.find({name: req.query.q})
            .then(products => {
                res.render('home', {
                    products: mitipleMongooseToObject(products)
                })  
            })
            .catch(next)
        // res.render('home')
    }
    // [GET] /Categories/:slug
    CategoryFilter(req, res, next){
        Product.find({category: req.params.slug})
            .then(products => {
                res.render('home', {
                    products: mitipleMongooseToObject(products)
                })  
            })
            .catch(next)
    }
}

module.exports = new SiteController;
