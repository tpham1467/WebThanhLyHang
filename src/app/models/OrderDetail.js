
const mongoose = require('mongoose')
const Schema = mongoose.Schema
var mongooseDelete = require('mongoose-delete');    

const OrderDetail = new Schema({
    customerId: {type: String, require: true},
    productId: {type: String, require: true},
    quantity: {type: Number, require: true},
},{
    timestamps: true,
})
OrderDetail.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: "all",
})  
module.exports = mongoose.model('OrderDetail', OrderDetail)