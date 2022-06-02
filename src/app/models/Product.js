
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const slug = require('mongoose-slug-generator')
var mongooseDelete = require('mongoose-delete');    

const Product = new Schema({
    name: {type: String, require: true},
    description: {type: String},
    price: {type: String, require: true},
    isChecked: { type: Boolean, require: true},
    quantity: {type: Number, require: true},
    userId: {type: String, require: true},
    category: {type: String, require: true},
    img: {type: String, require: true},
    slug: { type: String, slug: "name", unique: true},
},{
    timestamps: true,
})

mongoose.plugin(slug)
Product.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: "all",
})  
module.exports = mongoose.model('Product', Product)