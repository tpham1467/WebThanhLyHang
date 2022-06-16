const User = require("../models/User");
const News = require("../models/News");
const Comment = require("../models/Comment");
const {
  mitipleMongooseToObject,
  mongooseToObject,
} = require("../../util/mongoose");
class CommentsCotroller {
  //[Post] /comments/stored
  store(req, res, next) {
    req.body.userId = req.cookies.userId;
    const comment = new Comment(req.body);
    comment
      .save()
      .then(() => res.redirect("back"))
      .catch((error) => {});
  }
  //[put] /comments/:id/edit
  edit(req, res, next) {
    Comment.updateOne({ _id: req.params.id }, req.body)
      .then(() => res.redirect("back"))
      .catch(next);
  }
  //[delete] /comments/:id/delete
  destroy(req, res, next) {
    Comment.deleteOne({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }
}

module.exports = new CommentsCotroller();
