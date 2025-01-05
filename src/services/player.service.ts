import { PlayerModel } from '../models/Player.model';
import { PlayerDocument, PlayerRole } from '../interfaces/player.interface';
import logger from '../utils/logger';

class PlayerService {
    async createPlayer(playerData: Partial<PlayerDocument>): Promise<PlayerDocument> {
        try {
            const player = new PlayerModel(playerData);
            return await player.save();
        } catch (error) {
            logger.error(`Player creation failed: ${error}`);
            throw error;
        }
    }

    async getPlayerById(playerId: string): Promise<PlayerDocument | null> {
        try {
            return await PlayerModel.findById(playerId).lean();
        } catch (error) {
            logger.error(`Player retrieval failed: ${error}`);
            return null;
        }
    }

    async getPlayersByRole(role: PlayerRole): Promise<PlayerDocument[]> {
        try {
            return await PlayerModel.find({ role }).lean();
        } catch (error) {
            logger.error(`Players by role retrieval failed: ${error}`);
            throw error;
        }
    }

    async updatePlayerStats(playerId: string, stats: Partial<PlayerDocument['stats']>): Promise<PlayerDocument | null> {
        try {
            return await PlayerModel.findByIdAndUpdate(playerId, { $set: { stats } }, { new: true }).lean();
        } catch (error) {
            logger.error(`Player stats update failed: ${error} `);
            throw error;
        }
    }

    async searchPlayersByName(name: string): Promise<PlayerDocument[]> {
        try {
            return await PlayerModel.find({ name: { $regex: name, $options: 'i' } }).lean();
        } catch (error) {
            logger.error(`Player search failed: ${error}`);
            throw error;
        }
    }
}

export default new PlayerService();