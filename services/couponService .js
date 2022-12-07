


const{CreateDoc,findOne,delteOne,getAll,updateOne}=require('./Hfactory');

const coupon = require('../models/couponModel');



// Image processing


// @desc    Get list of categories
// @route   GET /api/v1/categories
// @access  Public
exports.getcoupons = getAll(coupon);

// @desc    Get specific coupon by id
// @route   GET /api/v1/categories/:id
// @access  Public
exports.getcoupon =findOne(coupon);

// @desc    Create coupon
// @route   POST  /api/v1/categories
// @access  Private/Admin-Manager
exports.createcoupon = CreateDoc(coupon);

// @desc    Update specific coupon
// @route   PUT /api/v1/categories/:id
// @access  Private/Admin-Manager
exports.deletecoupon = delteOne(coupon);

// @desc    Delete specific coupon
// @route   DELETE /api/v1/categories/:id
// @access  Private/Admin
exports.updatecoupon = updateOne(coupon);

