
const asyncHandler = require('express-async-handler');
const createToken = require('../utils/createToken ');
const ApiError = require('../utils/apiError');
const ApiFeatures = require('../utils/apiFeatures');








exports.CreateUser=(model)=> asyncHandler(async(req,res)=>{

  


    const DOC= await model.create(req.body);
    
    const token=  await createToken (DOC._id)
    

    res.status(200).json({data:DOC,token});
    


});
exports.CreateDoc=(model)=> asyncHandler(async(req,res)=>{

  


    const DOC= await model.create(req.body);
    
    // const token=  await createToken (user._id)
    

   // res.status(200).json({data:user,token});
    res.status(200).json({data:DOC});


});
exports.findOne=(model)=> asyncHandler(async(req,res)=>{

 
    const DOC= await model.findById(req.params.id);
    

    res.status(200).json({data:DOC});
  

});
exports.delteOne=(model)=> asyncHandler(async(req,res)=>{

    const DOC= await model.findByIdAndDelete(req.params.id);
    
    

    res.status(200).json({data:DOC});

});
exports.getAll=(model)=>

 asyncHandler(async(req,res)=>{

    let filter ={};
    
   
    
    const DOC= await model.find(filter);
    

    
    
    res.status(200).json({resulta:DOC.length ,data:DOC});
    

    

});
exports.updateOne= (Model) =>
asyncHandler(async (req, res, next) => {
  const document = await Model.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!document) {
    return next(
      new ApiError(`No document found for this id: ${req.params.id}`, 404)
    );
  }

  // To trigger 'save' event when update document
  //const doc = await document.save();

  
  res.status(200).json({ data: document });
});

    exports.getAllTest = (Model, modelName = '') =>
    asyncHandler(async (req, res) => {
      let filter = {};
      if (req.filterObj) {
        
        filter = req.filterObj;
      }
      
  
      // Build query
      // const documentsCounts = await Model.countDocuments();
      const apiFeatures = new ApiFeatures(Model.find(filter), req.query)
        .filter()
        .limitFields()
        .search(modelName)
        .sort();
      // .paginate();
  
      // Apply pagination after filer and search
      const docsCount = await Model.countDocuments(apiFeatures.mongooseQuery);
      apiFeatures.paginate(docsCount);
  
      // Execute query
      const { mongooseQuery, paginationResult } = apiFeatures;
      const documents = await mongooseQuery;
  
      // Set Images url
     // if (Model.collection.collectionName === 'products') {
       // documents.forEach((doc) => setImageUrl(doc));
      //}
      res
        .status(200)
        .json({ results: docsCount, paginationResult, data: documents });
    });