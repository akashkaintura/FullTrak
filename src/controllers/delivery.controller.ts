import { Request, Response } from 'express';
import DeliveryService from '../services/delivery.service';
import { handleErrorResponse } from '../utils/error-handler';

class DeliveryController {
    async createDelivery(req: Request, res: Response) {
        try {
            const deliveryData = req.body;
            const delivery = await DeliveryService.createDelivery(deliveryData);
            res.status(201).json({
                success: true,
                data: delivery
            });
        } catch (error) {
            handleErrorResponse(res, error);
        }
    }

    async getDeliveriesByMatchId(req: Request, res: Response) {
        try {
            const { matchId } = req.params;
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
            const deliveries = await DeliveryService.getDeliveriesByMatchId(matchId, page, limit);
            res.status(200).json({
                success: true,
                data: deliveries
            });
        } catch (error) {
            handleErrorResponse(res, error);
        }
    }
}

export default new DeliveryController();