import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { User } from '../models/user.model.js';
import { Book } from '../models/book.model.js';

// add book
const addBook = asyncHandler(async (req, res) => {
   const { id } = req.headers;
   const user = await User.findById(id);

   if (user.role !== 'admin') {
      throw new ApiError(403, 'Access denide! admin only');
   }

   const book = await Book.create({
      url: req.body.url,
      title: req.body.title,
      authors: req.body.authors,
      price: req.body.price,
      desc: req.body.desc,
      language: req.body.language,
   });

   return res
      .status(201)
      .json(new ApiResponse(201, book, 'Book added successfully'));
});

// update book
const updateBook = asyncHandler(async (req, res) => {
   const { bookId } = req.headers;

   const book = await Book.findOneAndUpdate(
      bookId,
      {
         url: req.body.url,
         title: req.body.title,
         authors: req.body.authors,
         price: req.body.price,
         desc: req.body.desc,
         language: req.body.language,
      },
      { new: true },
   );

   if (!book) {
      throw new ApiError(500, 'Book not found');
   }

   return res
      .status(200)
      .json(new ApiResponse(200, book, 'Book updated successfully'));
});

// get book by id
const getBook = asyncHandler(async (req, res) => {
   const { bookId } = req.params;

   if (!bookId) {
      throw new ApiError(400, 'Book ID is required');
   }

   const book = await Book.findById(bookId);

   if (!book) {
      throw new ApiError(400, 'Book not found');
   }

   return res
      .status(200)
      .json(new ApiResponse(200, book, 'Book fetched successfully'));
});

// get all books
const getAllBooks = asyncHandler(async (req, res) => {
   const books = await Book.find().sort({ createdAt: -1 });

   if (!books.length) {
      throw new ApiError(404, 'not found');
   }

   return res
      .status(200)
      .json(new ApiResponse(200, books, 'Books fetched Successfully'));
});

// get recents books
const getRecentsBooks = asyncHandler(async (req, res) => {
   const books = await Book.find().sort({ createdAt: -1 }).limit(4);

   if (!books.length) {
      throw new ApiError(404, 'Not found');
   }

   return res
      .status(200)
      .json(new ApiResponse(200, books, 'Books fetched Successfully'));
});

// delete book
const deleteBook = asyncHandler(async (req, res) => {
   const { bookid } = req.headers;

   if (!bookid) {
      throw new ApiError(400, 'BookId is requried');
   }

   await Book.findByIdAndDelete(bookid);

   return res
      .status(200)
      .json(new ApiResponse(200, 'Book deleted successfully'));
});

export {
   addBook,
   updateBook,
   getBook,
   getAllBooks,
   getRecentsBooks,
   deleteBook,
};
