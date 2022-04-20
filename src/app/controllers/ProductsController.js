const Product = require('../models/Product')
const { mitipleMongooseToObject, mongooseToObject} = require('../../util/mongoose')
class ProductsController {
    //[GET] /product/:slug
    show(req, res, next){
        Product.findOne({ slug: req.params.slug})
            .then(product => {
                res.render('products/show',{
                    product: mongooseToObject(product)
                })
            })
            .catch(next)
    }
    //[GET] /product/create 
    create(req, res, next){
        res.render('products/create')
    }
    //[POST] /product/store 
    store(req, res, next){
        req.body.img = req.file.filename;
        req.body.isChecked = false;
        req.body.userId = req.cookies.userId;
        const formdata = req.body;
        const product = new Product(formdata)
        product
            .save()
            .then(() => res.redirect("/me/stored/products"))
            .catch((error) => {})
        
    }
    //[POST] /product/:id/edit 
    edit(req, res, next){
        Product.findById(req.params.id)
            .then(product => res.render('products/edit', {
                product: mongooseToObject(product)
            }))
            .catch(next)
    }
    //[Put] /product/:id 
    update(req, res, next) {
        Product.updateOne({_id: req.params.id}, req.body)
            .then(() => res.redirect("/me/stored/products"))
            .catch(next)
    }
    //[Delete] /product/:id
    destroy(req, res, next) {
        Product.delete({_id: req.params.id})
            .then(() => res.redirect("back"))
            .catch(next)
    }
    //[Delete] /product/:id/force
    forceDestroy(req, res, next) {
        Product.deleteOne({_id: req.params.id})
            .then(() => res.redirect("back"))
            .catch(next)
    }
    //[Patch] /product/:id/restore
    restore(req, res, next) {
        Product.restore({_id: req.params.id})
            .then(() => res.redirect("back"))
            .catch(next)
    }
    //[Patch] /product/:id/check
    check(req, res, next) {
        Product.updateOne({_id: req.params.id}, {isChecked: true})
            .then(() => res.redirect("back"))
            .catch(next)
    }

    //[POST] /product/handleFormActions
    handleFormActions(req, res, next) {
        switch(req.body.action){
            case 'delete':
                Product.delete({_id: { $in: req.body.productsIds }})    
                .then(() => res.redirect("back"))
                .catch(next)
                break
            case 'forceDelete':
                Product.deleteOne({_id: { $in: req.body.productsIds }})    
                .then(() => res.redirect("back"))
                .catch(next)
                break
            case 'restore':
                Product.restore({_id: { $in: req.body.productsIds }})    
                .then(() => res.redirect("back"))
                .catch(next)
                break
            default:
                res.json({message: "Action is invalid"})
        }
    }

}

module.exports = new ProductsController;
