
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const slug = require('mongoose-slug-generator')
var mongooseDelete = require('mongoose-delete');    

const User = new Schema({
    name: {type: String, require: true},
    email: {type: String, require: true},
    password: {type: String, require: true},
    isAdmin: {type: Boolean, require: true},
    phone: {type: String, require: true},
    avatar: {type: String, require: true},
    address: {type: String, require: true},
    slug: { type: String, slug: "name", unique: true},
},{
    timestamps: true,
})

mongoose.plugin(slug)
User.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: "all",
})  
module.exports = mongoose.model('User', User)