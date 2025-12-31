import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';

export const verifyJWT = asyncHandler(async (req, _, next) => {
   try {
      const token = req.header('Authorization')?.replace('Bearer ', '');

      if (!token) {
         throw new ApiError(401, 'UnAuthrized request');
      }

      const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
      const user = await User.findById(decodedToken.id).select('-password');

      if (!user) {
         throw new ApiError(401, 'Invalid Access token');
      }

      req.user = user;
      next();
   } catch (error) {
      throw new ApiError(401, error?.message || 'Invalid token');
   }
});
