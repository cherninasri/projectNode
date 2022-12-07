const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const userSchema = new mongoose.Schema({

    name:{
        type:String,
        trim:true,
        required:[true, 'name required']
    },email: {
        type: String,
        required: [true, 'email required'],
        unique: true,
        lowercase: true,
      },
      image:String,
      passwordChangedAt: Date,
    passwordResetCode: String,
    passwordResetExpires: Date,
    passwordResetVerified: Boolean,
    role: {
      type: String,
      enum: ['user', 'manager', 'admin'],
      default: 'user'},

      phone: String,
    profileImg: String,
    password: {
        type: String,
        required: [true, 'password required'],
        minlength: [6, 'Too short password'],
      },
      slug: {
        type: String,
        lowercase: true,
      },



},{ timestamps: true });

userSchema.pre('save',async function (next){
  //ken matbadelech taada 
  if (!this.isModified('password')) return next();
  this.password= await bcrypt.hash(this.password,12);
  next();
})

const setImageURL = (doc) => {
  if (doc.image) {
    const imageUrl = `${process.env.BASE_URL}/users/${doc.image}`;
    doc.image = imageUrl;
  }
  
};
// findOne, findAll and update
userSchema.post('init', (doc) => {
  setImageURL(doc);
});

// create
userSchema.post('save', (doc) => {
  setImageURL(doc);
});

const user= mongoose.model('user',userSchema);
module.exports=user;

