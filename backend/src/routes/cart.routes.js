import { Router } from 'express';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import {
   addBookToCart,
   getCartBooks,
   removeBookFromCart,
} from '../controllers/cart.controller.js';

const router = Router();

router.route('/add-book-to-cart').put(verifyJWT, addBookToCart);
router.route('/get-carts-books').get(verifyJWT, getCartBooks);
router
   .route('/remove-book-from-cart/:bookid')
   .put(verifyJWT, removeBookFromCart);

export default router;
