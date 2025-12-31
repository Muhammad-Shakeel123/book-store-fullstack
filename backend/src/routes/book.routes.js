import { Router } from 'express';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import {
   addBook,
   deleteBook,
   getAllBooks,
   getBook,
   getRecentsBooks,
   updateBook,
} from '../controllers/book.controller.js';

const router = Router();

router.route('/add-book').post(verifyJWT, addBook);
router.route('/update-book').put(verifyJWT, updateBook);
router.route('/get-book-by-id/:bookId').get(getBook);
router.route('/get-all-books').get(getAllBooks);
router.route('/get-recents-books').get(getRecentsBooks);
router.route('/delete-book').delete(verifyJWT, deleteBook);

export default router;
