import { Router } from 'express';
import DeliveryController from '../controllers/delivery.controller';

const router = Router();

router.post('/', DeliveryController.createDelivery);
router.get('/match/:matchId', DeliveryController.getDeliveriesByMatchId);

export default router;