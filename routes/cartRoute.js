const express = require('express');




const {
  
  createcart,
  removeSpecificCartItem,
  GetCart,
  cleanCartitem,
  applycoupon
  
} = require('../services/cartService');
const authService = require('../services/authService');



const router = express.Router();


router
  .route('/').get(authService.protect,GetCart).delete(authService.protect,cleanCartitem)
  .post(authService.protect,
    createcart);

    router
    .route('/:item')
    .delete(authService.protect,
      removeSpecificCartItem);

      router
    .route('/applycoupon')
    .put(authService.protect,
      applycoupon);
  

module.exports = router;
