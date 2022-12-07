const express = require('express');




const {
  getcoupon,
  getcoupons,
  createcoupon,
  deletecoupon,
  
} = require('../services/couponService ');


const router = express.Router();


router
  .route('/')
  .get( getcoupons)
  .post(createcoupon);
router
  .route('/:id')
  .get(getcoupon)
  
  .delete(
    deletecoupon
  );

module.exports = router;
