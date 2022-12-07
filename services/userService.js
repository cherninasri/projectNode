
const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');
const asyncHandler = require('express-async-handler');

const user= require('../models/userModel');



const{CreateUser,findOne,delteOne,getAll}=require('./Hfactory');
const { uploadSingleImage } = require('../middlewares/uploadImageMiddleware');


// Upload single image
exports.uploadCategoryImage = uploadSingleImage('image');

// Image processing
exports.resizeImage = asyncHandler(async (req, res, next) => {
  const filename = `user-${uuidv4()}-${Date.now()}.jpeg`;

  if (req.file) {
    await sharp(req.file.buffer)
      .resize(600, 600)
      .toFormat('jpeg')
      .jpeg({ quality: 95 })
      .toFile(`uploads/Users/${filename}`);

    // Save image into our db
    req.body.image = filename;
  }

  next();
});


exports.userCreate=CreateUser(user);
    
exports.findOneUser=findOne(user);

exports.deleteOneUser=delteOne(user);

exports.FindAllUser=getAll(user);


