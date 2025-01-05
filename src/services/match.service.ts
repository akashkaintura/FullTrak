import { MatchModel } from '../models/Match.model';
import mongoose, { Schema, Document } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { MatchDocument } from '../interfaces/match.interface';
import logger from '../utils/logger';

class MatchService {
    async createMatch(matchData: Partial<MatchDocument>): Promise<MatchDocument> {
        try {
            const match = new MatchModel(matchData);
            return await match.save();
        } catch (error) {
            logger.error(`Match creation failed: ${error}`);
            throw error;
        }
    }

    async getMatchById(matchId: string): Promise<MatchDocument | null> {
        try {
            return await MatchModel.findById(matchId)
                .populate('teams.home')
                .populate('teams.away')
                .lean();
        } catch (error) {
            logger.error(`Match retrieval failed: ${error}`);
            return null;
        }
    }

    async getAllMatches(
        page: number = 1,
        limit: number = 10
    ): Promise<{ matches: MatchDocument[], total: number }> {
        try {
            const options = {
                page,
                limit,
                sort: { 'matchDetails.date': -1 }
            };

            const result = await MatchModel.paginate({}, options);

            return {
                matches: result.docs,
                total: result.totalDocs
            };
        } catch (error) {
            logger.error(`Matches retrieval failed: ${error}`);
            throw error;
        }
    }

    async updateMatch(
        matchId: string,
        updateData: Partial<MatchDocument>
    ): Promise<MatchDocument | null> {
        try {
            return await MatchModel.findByIdAndUpdate(
                matchId,
                updateData,
                { new: true }
            );
        } catch (error) {
            logger.error(`Match update failed: ${error}`);
            return null;
        }
    }
}

export default new MatchService();