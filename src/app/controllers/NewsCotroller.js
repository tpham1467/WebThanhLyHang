
class NewsController {
    //[GET] /news
    index(req, res, next){
        res.render('news')
    }
    show(req, res, next){
        res.send("New detail")
    }
}

module.exports = new NewsController;
