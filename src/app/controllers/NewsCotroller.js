const User = require('../models/User')
const News = require('../models/News')
const Comment = require('../models/Comment')
const { mitipleMongooseToObject, mongooseToObject} = require('../../util/mongoose')
class NewsController {
    //[GET] /news
    index(req, res, next){
        News.find({})
            .then(newss => {
                // const a = [];
                // newss.forEach(news => {
                //     a.push({
                //         userId: news.userId,
                //         blogId: news._id
                //     });
                // });
                const newses = []
                newss.forEach(news =>
                    {
                        News.findById(news._id)
                            .then( news => {
                                return User.findById(news.userId)
                                    .then(user => {
                                        user = mongooseToObject(user)
                                        news = mongooseToObject(news)
                                        return {
                                            news,
                                            user,
                                            curentUserId: req.cookies.userId
                                        }
                                    })
                            })
                            .then(data => {
                                return Comment.find({blogId: data.news._id})
                                    .then(comments => {
                                        comments = mitipleMongooseToObject(comments)
                                        comments.forEach(function(comment){
                                            User.findById(comment.userId)
                                                .then(user => {
                                                    user = mongooseToObject(user)
                                                    Object.assign(comment, {
                                                        userName: user.name,
                                                        userAvat: user.avatar,
                                                        userSlug: user.slug
                                                    })
                                                })
                                        })
                                        return { data, comments}
                                    })
                            })
                            .then(data => {
                                newses.push(data);
                            })
                    }    
                )
                res.render('news', {
                    newses
                })
            })
            .catch(next)
    }
    //[post] /news/create
    create(req, res, next){
        req.body.userId = req.cookies.userId
        const news = new News(req.body)
        news
            .save()
            .then(() => res.redirect("back"))
            .catch((error) => {})
    }
    //[detete] /news/:id/delete
    destroy(req, res, next){
        Promise.all([News.deleteOne({_id: req.params.id}),
            Comment.deleteMany({blogId: req.params.id})])
            .then(() => res.redirect("back"))
            .catch(next)
    }
}

module.exports = new NewsController;
