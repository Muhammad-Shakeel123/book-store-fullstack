import mongoose, { Schema } from 'mongoose';

const orderSchema = new Schema(
   {
      user: {
         type: mongoose.Types.ObjectId,
         ref: 'User',
      },
      book: {
         type: mongoose.Types.ObjectId,
         ref: 'Book',
      },
      status: {
         type: String,
         default: 'order placed',
         enum: ['order placed', 'out for delivery', 'delivered', 'cancelled'],
      },
   },
   { timestamps: true },
);

export const Order = mongoose.model('Order', orderSchema);
