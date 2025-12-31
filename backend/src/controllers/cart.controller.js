import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { User } from '../models/user.model.js';

// add book to cart
const addBookToCart = asyncHandler(async (req, res) => {
   const { bookid, userid } = req.headers;

   if (!bookid || !userid) {
      throw new ApiError(400, 'bookid & userid are required');
   }

   const user = await User.findById(userid);
   if (!user) {
      throw new ApiError(404, 'User not found');
   }

   const cartExist = user.cart.includes(bookid);

   if (cartExist) {
      return res
         .status(409)
         .json(new ApiResponse(409, null, 'Book already in cart'));
   }

   await User.findByIdAndUpdate(
      userid,
      { $push: { cart: bookid } },
      { new: true },
   );

   return res
      .status(200)
      .json(new ApiResponse(200, null, 'Book added to cart successfully'));
});

// get carts books
const getCartBooks = asyncHandler(async (req, res) => {
   const { userid } = req.headers;

   if (!userid) {
      throw new ApiError(400, 'UserId is required');
   }

   const user = await User.findById(userid).populate('cart');

   if (!user) {
      throw new ApiError(404, 'User not found'); // fixed
   }

   const userData = user.cart;

   return res
      .status(200)
      .json(
         new ApiResponse(
            200,
            userData,
            userData.length ? 'Cart fetched successfully' : 'Cart is empty',
         ),
      );
});

// Remove Book from cart
const removeBookFromCart = asyncHandler(async(req, res) => {
   const { bookid } = req.params;
   const { userid } = req.headers;

   if (!bookid) {
      throw new ApiError(400, "Book id is required");
   }

   if (!userid) {
      throw new ApiError(400, "User id is required");
   }

   await User.findByIdAndUpdate(userid, {
      $pull: { cart: bookid }
   });

   return res.status(200).json(
      new ApiResponse(200, "Book removed from cart")
   );
});


export { addBookToCart, getCartBooks, removeBookFromCart };
