import { Router } from "express";
import * as pedidoController from '../controllers/orders.controller';

const router = Router();

router.get('/', pedidoController.getOrdersAll);
router.get('/:id', pedidoController.getPedidoById);
router.post('/', pedidoController.addPedidos);
router.put('/:id', pedidoController.updatePedido);
router.delete('/:id', pedidoController.deletePedidoByValue);

export default router;