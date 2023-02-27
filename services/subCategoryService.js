const factory = require('./Hfactory');
const SubCategory = require('../models/subCategoryModel');
const{CreateDoc,findOne,delteOne,getAll,getAllTest,updateOne}=require('./Hfactory');


exports.setCategoryIdToBody = (req, res, next) => {
  // Nested route (Create)
  if (!req.body.category) req.body.category = req.params.categoryId;
  next();
};

// Nested route
// GET /api/v1/categories/:categoryId/subcategories
exports.createFilterObj = (req, res, next) => {
  let filterObject = {};
  if (req.params.categoryId) filterObject = { category: req.params.categoryId };
  
  

  req.filterObj = filterObject;
  
  next();
};

// @desc    Get list of subcategories
// @route   GET /api/v1/subcategories
// @access  Public
exports.getSubCategories = getAllTest(SubCategory);

// @desc    Get specific subcategory by id
// @route   GET /api/v1/subcategories/:id
// @access  Public
exports.getSubCategory = findOne(SubCategory);

// @desc    Create subCategory
// @route   POST  /api/v1/subcategories
// @access  Private
exports.createSubCategory = CreateDoc(SubCategory);

// @desc    Update specific subcategory
// @route   PUT /api/v1/subcategories/:id
// @access  Private
exports.updateSubCategory = updateOne(SubCategory);

// @desc    Delete specific subCategory
// @route   DELETE /api/v1/subcategories/:id
// @access  Private
exports.deleteSubCategory = delteOne(SubCategory);
