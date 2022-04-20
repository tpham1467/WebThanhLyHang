const User = require('../models/User')
const { mitipleMongooseToObject, mongooseToObject} = require('../../util/mongoose')

module.exports = function requireLogin(req, res, next) {
    
    if(!req.cookies.userId){
        res.redirect('/auth/login');
        return;
    }
    User.findOne({_id: req.cookies.userId}, function(err, user){
        if(!user){
            res.redirect('/auth/login');
            return;
        }
        res.locals.user = mongooseToObject(user);
    })
    next();
}