const mongoose = require('mongoose');
// 1- Create Schema
const cartSchema = new mongoose.Schema(
  {
    cartitems:[ {
      product: {
        type: mongoose.Schema.ObjectId,
        ref: 'product',
       },
       color:String,
       price:Number,
       quantity:{
        type:Number,
        default:1
       }
    }
    ],
    
    totalCartPrice: Number,
    totalPriceAfterDiscount: Number,
    User: {
      type: mongoose.Schema.ObjectId,
      ref: 'user',
     },

  },
  { timestamps: true }
);



// 2- Create model
const cart = mongoose.model('Cart', cartSchema);

module.exports = cart;
