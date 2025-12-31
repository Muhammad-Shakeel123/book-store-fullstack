import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { User } from '../models/user.model.js';

// generate token
const generate_Token = async (userId) => {
   try {
      const user = await User.findById(userId);
      const token = user.generateToken();

      await user.save({ validateBeforeSave: false });
      return token;
   } catch (error) {
      throw new ApiError(500, 'something wrong while generating token');
   }
};

// User Sign up
const userSignUp = asyncHandler(async (req, res) => {
   const { username, email, password, address } = req.body;

   if (
      [username, email, password, address].some((field) => field?.trim() === '')
   ) {
      throw new ApiError(400, 'All fields are requird');
   }

   const existingUser = await User.findOne({
      $or: [{ username }, { email }],
   });

   if (existingUser) {
      throw new ApiError(409, 'User with email or username is already exist');
   }

   const user = await User.create({
      username,
      email,
      password,
      address,
   });

   const createdUser = await User.findById(user._id).select('-password');

   if (!createdUser) {
      throw new ApiError(500, 'Something wrong while registerd user');
   }

   return res
      .status(201)
      .json(new ApiResponse(200, createdUser, 'User registerd successfully'));
});

// User login
const userLogin = asyncHandler(async (req, res) => {
   const { username, password } = req.body;

   if (!username && !password) {
      throw new ApiError(400, 'Invalid Cerditionals');
   }

   const user = await User.findOne({
      $or: [{ username }, { password }],
   });

   if (!user) {
      throw new ApiError(404, 'User dose not exist');
   }

   const isPasswordValid = await user.isPasswordCorrect(password);

   if (!isPasswordValid) {
      throw new ApiError(401, 'Invalid Creditionals');
   }

   const token = await generate_Token(user._id);

   const loggedInUser = await User.findById(user._id).select('-password');

   return res
      .status(201)
      .json(
         new ApiResponse(
            200,
            { user: loggedInUser, token },
            'User login Successfully',
         ),
      );
});

//get user information
const getUserInformation = asyncHandler(async (req, res) => {
   const user = req.user;

   if (!user) {
      throw new ApiError(404, 'User not found');
   }

   return res
      .status(200)
      .json(new ApiResponse(200, user, 'User fetched successfully'));
});

// update address
const updateAddress = asyncHandler(async (req, res) => {
   const { userid } = req.headers;
   const { address } = req.body;

   if (!address) {
      throw new ApiError(400, 'Address is required');
   }

   const user = await User.findByIdAndUpdate(
      userid,
      { address: address },
      { new: true },
   ).select('-password');

   if (!user) {
      throw new ApiError(404, 'User not found');
   }

   return res
      .status(200)
      .json(new ApiResponse(200, user, 'Address updated successfully'));
});

export { userSignUp, userLogin, getUserInformation, updateAddress };
