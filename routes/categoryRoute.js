const express = require('express');

const {
  getCategoryValidator,
  createCategoryValidator,
  updateCategoryValidator
 
} = require('../utils/validators/categoryValidator');

const {
  getCategories,
  getCategory,
  createCategory,
  deleteCategory,
  updateCategory,
  uploadCategoryImage,
  resizeImage,
} = require('../services/categoryService');

const authService = require('../services/authService');
const subcategoriesRouter = require('./subCategoryRoute');




const router = express.Router();

// Nested route
router.use('/:categoryId/subcategories', subcategoriesRouter)


router
  .route('/')
  .get(getCategories);
  router
  .route('/').post(
    
    uploadCategoryImage,
    resizeImage,
    //authService.protect,
   // authService.allowedTo('admin'),

    createCategoryValidator,
    createCategory
  );
router
  .route('/:id')
  .get(getCategoryValidator, getCategory)
  
  
  router
  .route('/:id').delete(
    authService.protect,
    authService.allowedTo('admin'),
    deleteCategory
  ).patch(authService.protect,
    authService.allowedTo('admin'),
  updateCategoryValidator,
  updateCategory
 )

  
module.exports = router;
