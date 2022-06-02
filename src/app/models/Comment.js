
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const slug = require('mongoose-slug-generator')
var mongooseDelete = require('mongoose-delete');    

const Comment = new Schema({
    description: {type: String},
    userId: {type: String, require: true},
    blogId: {type: String, require: true},
    newsId: {type: String, require: true},
    productId: {type: String, require: true}
},{
    timestamps: true,
})

mongoose.plugin(slug)
Comment.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: "all",
})  
module.exports = mongoose.model('Comment', Comment)