import { Router } from 'express';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import {
   getAllOrders,
   orderHistory,
   placedOrder,
   updateOrderStatus,
} from '../controllers/order.controller.js';

const router = Router();

router.route('/place-order').post(verifyJWT, placedOrder);
router.route('/get-all-orders').get(verifyJWT, getAllOrders);
router.route('/get-order-history').get(verifyJWT, orderHistory);
router.route('/update-order-status/:orderid').put(verifyJWT, updateOrderStatus);

export default router;
