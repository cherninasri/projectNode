const express = require('express');

const{forgotPassword,verifyPassResetCode,resetPassword,login}=require('../services/authService')
const{loginValidator}= require('../utils/validators/userValidator')


const router = express.Router();





router.post('/forgotPassword',forgotPassword);
router.post('/verifyPassResetCode',verifyPassResetCode);
router.post('/resetPassword',resetPassword);
router.post('/login',loginValidator,login);





module.exports = router;
