
const User = require('../models/User')
const { mitipleMongooseToObject, mongooseToObject} = require('../../util/mongoose')
class AuthController {
    // [Post] auth/login
    login(req, res, next){      
        User.findOne({email: req.body.email}, function(err, user){
            if(err) return res.send("Khong co tai khoan");
            if(!user) {
                res.render("auth/login", {
                    errors: [
                        'Tài khoản không tồn tại',
                    ],
                    values: req.body,
                })
                return;
            }
            if(user.password !== req.body.password){
                res.render("auth/login", {
                    errors: [
                        'Sai mật khẩu',
                    ],
                    values: req.body,
                })
                return;
            }
            if(user.deleted){
                res.render("auth/login", {
                    errors: [
                        'Tài khoản tạm khóa',
                    ],
                    values: req.body,
                })
                return;
            }
            res.cookie("userId", user._id);
            res.redirect("/");
        })

    }
    // [post] auth/register
    register(req, res, next){
        
        User.findOne({email: req.body.email}, function(err, user ){
            if(err) return res.send("404");
            if(user){
                res.render("auth/register", {
                    errors: [
                        'Tài khoản đã tồn tại',
                    ],
                    values: req.body,
                })
                return;
            }
            if(!req.body.email || !req.body.password || !req.body.phone){
                res.render("auth/register", {
                    errors: [
                        'Hãy nhập đủ các trường',
                    ],
                    values: req.body,
                })
                return;
            }
            if(req.body.password !== req.body.password_confirmation){
                res.render("auth/register", {
                    errors: [
                        'Mật khẩu không trùng nhau',
                    ],
                    values: req.body,
                })
                return;
            }
            req.body.avatar = "default-avatar.png"
            const formdata = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                phone: req.body.phone,
                avatar: req.body.avatar,
                address: req.body.address,
                isAdmin: false,
            }
            const user1 = new User(formdata)
            user1
                .save()
                .then(() => res.redirect("/auth/login"))
                .catch((error) => {})
            })
        
    }

    showLogin(req, res, next){
        res.render('auth/login')
    }

    showRegister(req, res, next){
        res.render('auth/register')
    }
}

module.exports = new AuthController;
