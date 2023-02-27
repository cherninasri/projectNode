const path = require('path');

const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');

dotenv.config({ path: 'config.env' });
const ApiError = require('./utils/apiError');
const globalError = require('./middlewares/errorMiddleware');
const dbConnection = require('./config/database');
const cors = require('cors')
const compression = require('compression')

// Routes

const userRouter=require('./routes/userRoter')
const authRouter=require('./routes/authRouter')
const ProductRouter=require('./routes/productRoute')
const CategorytRouter=require('./routes/categoryRoute')
const reviewRouter=require('./routes/reviewRoute')
const couponRouter=require('./routes/couponRoute ')
const cartRouter=require('./routes/cartRoute')
const orderRouter=require('./routes/orderRoute')
const subCategoryRoute=require('./routes/subCategoryRoute')






// Connect with db
dbConnection();

// express app
const app = express();

// Middlewares
app.use(express.json());


app.use(cors())
app.options('*', cors())

 //tcomperi les fichiers
app.use(compression())


//tkhademlek file hetha 
app.use(express.static(path.join(__dirname, 'uploads')));



if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
  console.log(`mode: ${process.env.NODE_ENV}`);
}

// Mount Routes
app.use('/shop/Category', CategorytRouter);
app.use('/shop/order', orderRouter);

app.use('/shop/product', ProductRouter);
app.use('/shop/auth', authRouter);
app.use('/shop/review', reviewRouter);
app.use('/shop/coupon', couponRouter);
app.use('/shop/user', userRouter);
app.use('/shop/cart', cartRouter);
app.use('/shop/subCaregory', subCategoryRoute);




app.all('*', (req, res, next) => {
  next(new ApiError(`Can't find this route: ${req.originalUrl}`, 400));
});

// Global error handling middleware for express
app.use(globalError);

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log(`App running running on port ${PORT}`);
});

// Handle rejection outside express
process.on('unhandledRejection', (err) => {
  console.error(`UnhandledRejection Errors: ${err.name} | ${err.message}`);
  server.close(() => {
    console.error(`Shutting down....`);
    process.exit(1);
  });
});
