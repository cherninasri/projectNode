const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    User: {
      type: mongoose.Schema.ObjectId,
      ref: 'user',
      required: [true, 'Order must be belong to user'],
    },
    cartItems: [
      {
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

    taxPrice: {
      type: Number,
      default: 0,
    },
    shippingAddress: {
      details: String,
      phone: String,
      city: String,
      postalCode: String,
    },
    shippingPrice: {
      type: Number,
      default: 0,
    },
    totalOrderPrice: {
      type: Number,
    },
    paymentMethodType: {
      type: String,
      enum: ['card', 'cash'],
      default: 'cash',
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    paidAt: Date,
    isDelivered: {
      type: Boolean,
      default: false,
    },
    deliveredAt: Date,
  },
  { timestamps: true }
);

orderSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'User',
    select: 'name profileImg email phone',
  }).populate({
    path: 'cartItems.product',
    select: 'title imageCover ',
  });

  next();
});

module.exports = mongoose.model('Order', orderSchema);

// In@in2016
//progahmedelsayed@gmail.com
