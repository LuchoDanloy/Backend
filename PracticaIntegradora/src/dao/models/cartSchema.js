import mongoose, { Schema } from "mongoose"

const cartCollection = 'carts'

const CartModel = new Schema({
    products: [{
        product: {type: Schema.Types.String, require: true},
        quantity: {type: Schema.Types.Number, require: true},
        _id: false 
    }]
})

export default mongoose.model(cartCollection, CartModel);