import { DeliveryModel } from '../models/Delivery.model';
import { DeliveryDocument } from '../interfaces/delivery.interface';
import logger from '../utils/logger';

class DeliveryService {
    async createDelivery(deliveryData: Partial<DeliveryDocument>): Promise<DeliveryDocument> {
        try {
            const delivery = new DeliveryModel(deliveryData);
            return await delivery.save();
        } catch (error) {
            logger.error(`Delivery creation failed: ${error}`);
            throw error;
        }
    }

    async getDeliveriesByMatchId(matchId: string, page: number = 1, limit: number = 10): Promise<DeliveryDocument[]> {
        try {
            const deliveries = await DeliveryModel.find({ matchId })
                .skip((page - 1) * limit)
                .limit(limit)
                .lean();
            return deliveries;
        } catch (error) {
            logger.error(`Deliveries retrieval failed: ${error}`);
            throw error;
        }
    }
}

export default new DeliveryService();