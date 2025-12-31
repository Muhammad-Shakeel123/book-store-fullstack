import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema = new Schema(
   {
      username: {
         type: String,
         required: true,
         unique: true,
      },
      email: {
         type: String,
         required: true,
         unique: true,
      },
      password: {
         type: String,
         required: true,
      },
      address: {
         type: String,
         required: true,
      },
      avatar: {
         type: String,
         default:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXLfBcnHRy3Fmx6-rbrdQoifxsrvtlKFox4Q&s',
      },
      role: {
         type: String,
         default: 'user',
         enum: ['user', 'admin'],
      },
      favourites: [
         {
            type: mongoose.Types.ObjectId,
            ref: 'Book',
         },
      ],

      cart: [
         {
            type: mongoose.Types.ObjectId,
            ref: 'Book',
         },
      ],

      orders: [
         {
            type: mongoose.Types.ObjectId,
            ref: 'Order',
         },
      ],
   },
   { timestamps: true },
);

userSchema.pre('save', async function () {
   if (!this.isModified('password')) return;

   this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.isPasswordCorrect = async function (password) {
   return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateToken = function () {
   return jwt.sign(
      {
         id: this._id,
         username: this.username,
         email: this.email,
      },
      process.env.TOKEN_SECRET,
      {
         expiresIn: process.env.TOKEN_EXPIRY,
      },
   );
};

export const User = mongoose.model('User', userSchema);
