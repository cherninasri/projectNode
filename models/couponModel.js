const mongoose = require('mongoose');
// 1- Create Schema
const couponSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'coupon required'],
      unique: [true, 'coupon must be unique'],
      trim: true,
    },
    
    expire:{
      type: Date,
      required: [true, 'coupon expire time require '],



    },
    discount:{
      type:Number,
      required: [true, 'coupon discount value require '],



    }
  },
  { timestamps: true }
);



// 2- Create model
const coupon = mongoose.model('Coupon', couponSchema);

module.exports = coupon;
