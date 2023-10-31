import { Router } from "express";
import * as ordenesController from '../controllers/ordenes.controller';

const router = Router();

router.get('/', ordenesController.getOrdenesAll);
router.get('/:id', ordenesController.getOrdenesOne);
router.post('/', ordenesController.addOrdenes);
router.put('/:id', ordenesController.updateOrden);
router.delete('/:id', ordenesController.deleteOrdenOne);

export default router;