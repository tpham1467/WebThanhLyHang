
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const slug = require('mongoose-slug-generator')
var mongooseDelete = require('mongoose-delete');    

const Category = new Schema({
    name: {type: String, require: true},
    img: {type: String, require: true},
    slug: { type: String, slug: "name", unique: true},
},{
    timestamps: true,
})

mongoose.plugin(slug)
Category.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: "all",
})  
module.exports = mongoose.model('Category', Category)