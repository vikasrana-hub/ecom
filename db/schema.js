const mongoose = require('mongoose');
const { string } = require('zod');



const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    is_admin: {
        type: Boolean,
        default: false,
    },
    firstname: String,
    
    cart: [

        {
            product_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
            },
            name:{
                type:String
            },
            price: {
                type: Number,
            }
            

        }
    ]

})

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    inStock: { type: Boolean, default: true },
    description: String,
    url: String
})
const User = mongoose.model('User', userSchema)
const Product = mongoose.model('Product', productSchema)


module.exports = {
    User,
    Product
};