import { Router } from "express";
import * as ordersController from '../controllers/orders.controller';

const router = Router();

router.get('/', ordersController.getOrdersAll);
router.get('/:id', ordersController.getOrdersOne);
router.post('/', ordersController.addOrders);
router.put('/:id', ordersController.updateOrder);
router.delete('/:id', ordersController.deleteOrderOne);

export default router;