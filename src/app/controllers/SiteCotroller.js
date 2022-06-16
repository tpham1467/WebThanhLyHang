const Product = require("../models/Product");
const {
  mitipleMongooseToObject,
  mongooseToObject,
} = require("../../util/mongoose");
class SiteController {
  //[GET] /
  index(req, res, next) {
    if (req.query.hasOwnProperty("logout")) {
      res.clearCookie("userId", { path: "/" });
      res.redirect("/auth/login");
    }
    let productQuery = Product.find({ isChecked: true });
    if (req.query.hasOwnProperty("_sort")) {
      productQuery = productQuery.sort({
        [req.query.column]: req.query.type,
      });
    }
    Promise.all([productQuery, Product.countDocuments()])
      .then(([products, productsCount]) =>
        res.render("home", {
          productsCount,
          products: mitipleMongooseToObject(products),
        })
      )
      .catch(next);
    // res.render('home')
  }
  // [GET] /Search
  Search(req, res, next) {
    var s = req.query.q;
    Product.find({})
      .then((pros) => {
        const products = [];
        pros.forEach((product) => {
          product = mongooseToObject(product);
          if (product.name.includes(s)) {
            products.push(product);
          }
        });
        res.render("home", {
          products,
        });
      })
      .catch(next);
    // res.render('home')
  }
  // [GET] /Categories/:slug
  CategoryFilter(req, res, next) {
    Product.find({ category: req.params.slug })
      .then((products) => {
        res.render("home", {
          products: mitipleMongooseToObject(products),
        });
      })
      .catch(next);
  }
}

module.exports = new SiteController();
