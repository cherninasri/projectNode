
const express = require('express');
const{userCreate,findOneUser,deleteOneUser,FindAllUser,uploadCategoryImage,resizeImage}=require('../services/userService');
const{createUserValidator,getUserValidator,deleteUserValidator}= require('../utils/validators/userValidator')


const router = express.Router();

router.route('/').get(FindAllUser).post(uploadCategoryImage,resizeImage,createUserValidator,userCreate);
router.route('/:id').get(getUserValidator,findOneUser)
router.route('/:id').delete(deleteUserValidator,deleteOneUser);








module.exports = router;





