import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { User } from '../models/user.model.js';

// add book to favorites
const addBookToFavorites = asyncHandler(async (req, res) => {
   const { bookid, userid } = req.headers;

   if (!bookid || !userid) {
      throw new ApiError(400, 'bookid & userid are required');
   }

   const user = await User.findById(userid);
   if (!user) {
      throw new ApiError(404, 'User not found');
   }

   const favoritesExist = user.favourites.includes(bookid);

   if (favoritesExist) {
      return res
         .status(409)
         .json(new ApiResponse(409, null, 'Book already in favorites'));
   }

   await User.findByIdAndUpdate(
      userid,
      { $push: { favourites: bookid } },
      { new: true },
   );

   return res
      .status(200)
      .json(new ApiResponse(200, null, 'Book added to favorites successfully'));
});

// get favourites books
const getFavouritesBooks = asyncHandler(async (req, res) => {
   const { userid } = req.headers;

   if (!userid) {
      throw new ApiError(400, 'UserId is required');
   }

   const user = await User.findById(userid).populate('favourites');

   if (!user) {
      throw new ApiError(404, 'User not found');
   }

   const userData = user.favourites;

   return res
      .status(200)
      .json(
         new ApiResponse(
            200,
            userData,
            userData.length
               ? 'Favorites fetched successfully'
               : 'Favorites is empty',
         ),
      );
});

// Remove Book from favourites
const removeBookFromFavourites = asyncHandler(async (req, res) => {
   const { bookid } = req.headers;
   const { userid } = req.headers;

   if (!bookid) {
      throw new ApiError(400, 'Book id is required');
   }

   if (!userid) {
      throw new ApiError(400, 'User id is required');
   }

   await User.findByIdAndUpdate(userid, {
      $pull: { favourites: bookid },
   });

   return res
      .status(200)
      .json(new ApiResponse(200, 'Book removed from favourites'));
});

export { addBookToFavorites, getFavouritesBooks, removeBookFromFavourites };
