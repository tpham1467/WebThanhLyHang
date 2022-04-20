
const Product = require('../models/Product')
const { mitipleMongooseToObject, mongooseToObject} = require('../../util/mongoose')
class SiteController {
    //[GET] /
    index(req, res, next){
        if(req.query.hasOwnProperty('logout')){
            res.clearCookie('userId', {path: '/'});
            res.redirect('/auth/login');
        }
        Product.find({isChecked: true})
            .then(products => {
                res.render('home', {
                    products: mitipleMongooseToObject(products)
                })  
            })
            .catch(next)
        // res.render('home')
    }
    // [GET] /Search
    Search(req, res, next){
        
        Product.find({name: req.query.q})
            .then(products => {
                res.render('home', {
                    products: mitipleMongooseToObject(products)
                })  
            })
            .catch(next)
        // res.render('home')
    }
}

module.exports = new SiteController;
