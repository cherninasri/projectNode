const express = require('express');
const {
  createCashOrder,
  getAllOrder,
  getAllOrderTest,
  filterOrderForLoggedUser
} = require('../services/orderService');

const authService = require('../services/authService');

const router = express.Router();



router.route('/').get(authService.protect,authService.allowedTo('admin','user'),filterOrderForLoggedUser, getAllOrderTest);

router.route('/:cartId').post(authService.protect,authService.allowedTo('user','admin'), createCashOrder);


module.exports = router;
