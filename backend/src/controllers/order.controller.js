import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { User } from '../models/user.model.js';
import { Order } from '../models/order.model.js';

// place order
const placedOrder = asyncHandler(async (req, res) => {
   const { userid } = req.headers;
   const { order } = req.body;

   if (!userid) throw new ApiError(400, 'User ID is required');
   if (!order || !Array.isArray(order) || order.length === 0) {
      throw new ApiError(400, 'Order list is required');
   }

   for (const item of order) {
      const newOrder = new Order({
         user: userid,
         book: item._id,
      });

      const savedOrder = await newOrder.save();

      await User.findByIdAndUpdate(userid, {
         $push: { orders: savedOrder._id },
      });

      await User.findByIdAndUpdate(userid, {
         $pull: { cart: item._id },
      });
   }

   return res
      .status(200)
      .json(new ApiResponse(200, 'Placed order(s) successfully'));
});

// get all orders
const getAllOrders = asyncHandler(async (req, res) => {
   const data = await Order.find()
      .populate('user')
      .populate('book')
      .sort({ createdAt: -1 });

   return res.status(200).json(new ApiResponse(200, data, 'All orders'));
});

// get order history
const orderHistory = asyncHandler(async (req, res) => {
   const { userid } = req.headers;
   if (!userid) {
      throw new ApiError(400, 'User id is required');
   }

   const user = await User.findById(userid).populate({
      path: 'orders',
      populate: { path: 'book' },
   });

   const orderData = user.orders.reverse();

   return res
      .status(200)
      .json(new ApiResponse(200, orderData, 'orders history'));
});

// update status
const updateOrderStatus = asyncHandler(async (req, res) => {
   const { orderid } = req.params;
   if (!orderid) throw new ApiError(400, 'Order id is required');

   const changedStatus = await Order.findByIdAndUpdate(
      orderid,
      { status: req.body.status },
      { new: true },
   );

   return res
      .status(200)
      .json(new ApiResponse(200, changedStatus, 'Status changed successfully'));
});

export { placedOrder, getAllOrders, orderHistory, updateOrderStatus };
