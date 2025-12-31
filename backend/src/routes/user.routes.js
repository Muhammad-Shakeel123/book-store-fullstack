import { Router } from 'express';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import {
   userSignUp,
   userLogin,
   getUserInformation,
   updateAddress,
} from '../controllers/user.controller.js';

const router = Router();

router.route('/sign-up').post(userSignUp);
router.route('/sign-in').post(userLogin);
router.route('/get-user-information').get(verifyJWT, getUserInformation);
router.route('/update-address').put(verifyJWT, updateAddress);

export default router;
