import { Router } from 'express';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import {
   addBookToFavorites,
   getFavouritesBooks,
   removeBookFromFavourites,
} from '../controllers/favorites.controller.js';

const router = Router();

router.route('/add-book-to-favourite').put(verifyJWT, addBookToFavorites);
router.route('/get-favourites-books').get(verifyJWT, getFavouritesBooks);
router
   .route('/remove-book-from-favourites')
   .put(verifyJWT, removeBookFromFavourites);

export default router;
