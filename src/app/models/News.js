
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const slug = require('mongoose-slug-generator')
var mongooseDelete = require('mongoose-delete');    

const News = new Schema({
    description: {type: String},
    userId: {type: String, require: true},
    img: {type: String},
},{
    timestamps: true,
})

mongoose.plugin(slug)
News.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: "all",
})  
module.exports = mongoose.model('News', News)