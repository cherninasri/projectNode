
const asyncHandler = require('express-async-handler');
const createToken = require('../utils/createToken ');
const ApiError = require('../utils/apiError');






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
    
   
    
    const DOC= await model.find({filter});
    

    
    
    res.status(200).json({resulta:DOC.length ,data:DOC});
    

    

});
exports.updateOne=(model)=> asyncHandler(async(req,res)=>{

    const DOC= await model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
  
      if (!DOC) {
        return next(
          new ApiError(`No document for this id ${req.params.id}`, 404)
        );
      }
      // Trigger "save" event when update document
      DOC.save();
      res.status(200).json({ data: DOC });
    });

