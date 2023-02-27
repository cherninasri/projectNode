const express = require('express');
const {
  createCashOrder,
  getAllOrder,
  getAllOrderTest,
  filterOrderForLoggedUser,
  checkoutSession
} = require('../services/orderService');

const authService = require('../services/authService');

const router = express.Router();



router.route('/').get(authService.protect,authService.allowedTo('admin','user'),filterOrderForLoggedUser, getAllOrderTest);

router.route('/:cartId').post(authService.protect,authService.allowedTo('user','admin'), createCashOrder);

router.route('/session/:cartId').get(authService.protect,authService.allowedTo('user'), checkoutSession);



module.exports = router;
