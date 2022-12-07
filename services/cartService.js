
const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/apiError');





const cart = require('../models/cartModel ');
const Coupon = require('../models/couponModel');

const Product = require('../models/productModel');




const calctotalprice =(cart)=>{
  let totalprice = 0;
cart.cartitems.forEach((e) => {

  totalprice += e.quantity * e.price

});
return totalprice

}




// @desc    Create cart
// @route   POST  /api/v1/categories
// @access  Private/Admin-Manager
exports.createcart = asyncHandler(async(req,res,next)=>{
    const{product,color}=req.body ;
  const productitem = await Product.findById(product);
  let cartitem = await cart.findOne({User:req.user._id});
  if(!cartitem){
    cartitem=  await cart.create({
      cartitems:
      [{product,
        price:productitem.price,
        color:color}],
  
        User: req.user._id,
        


    })
  
    
  }else{
    const productExist = await cartitem.cartitems.findIndex((i)=> i.product.toString() == product && i.color == color
    
    
  
    );
    

    if(productExist>-1){
        cartExist= cartitem.cartitems[productExist];
        cartExist.quantity+=1;
        cartitem.cartitems[productExist]=cartExist;

    }else{
      cartitem.cartitems.push({product,
        price:productitem.price,
        color})
    }

  }

   const totalCartPrice = calctotalprice(cartitem);
  cartitem.totalCartPrice=totalCartPrice;

   await cartitem.save();

   res.status(200).json( {data:cartitem})



})

exports.removeSpecificCartItem = asyncHandler(async(req,res,next)=>{
  
  const Cart = await cart.findOneAndUpdate(
    { User : req.user._id },
    {
    $pull: { cartitems : {_id:req.params.item } },
  },
  {new : true}
  )
  

  totalCartPrice=calctotalprice(Cart);
  console.log(totalCartPrice)
  Cart.totalCartPrice=totalCartPrice;
  Cart.save()
  

  
  res.status(200).json( {data:Cart})

  




})
exports.GetCart = asyncHandler(async(req,res,next)=>{
  
  const Cart = await cart.findOne(
    { User : req.user._id },
   
  )
  

  
  

  
  res.status(200).json( {data:Cart})

  




})
exports.cleanCartitem = asyncHandler(async(req,res,next)=>{
  
  const Cart = await cart.findOneAndDelete(
    { User : req.user._id },
    {new : true}
   
  )
  

  
  

  
  res.status(200).json( {data:Cart})

  




})

exports.applycoupon = asyncHandler(async(req,res,next)=>{

  const coupon = await Coupon.findOne({
    name:req.body.name
  , expire :{$gt:Date.now()}
  })

  if(!coupon){
    return next(
      new ApiError(`coupon is invalid or expired`)
      
      );
  }
 const Cart= await cart.findOne({User : req.user._id});
  
  

  const totalCartPrice =Cart.totalCartPrice;
  const totalPriceAfterDiscount=(totalCartPrice-(totalCartPrice*coupon.discount)/100).toFixed(2);
  Cart.totalPriceAfterDiscount=totalPriceAfterDiscount

 await Cart.save()
  
  res.status(200).json( {data:Cart})

  




})



