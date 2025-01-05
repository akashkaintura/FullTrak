import { MatchModel } from '../models/Match.model';
import mongoose from 'mongoose';
import { MatchDocument } from '../interfaces/match.interface';
import logger from '../utils/logger';

interface PaginationOptions {
    page?: number;
    limit?: number;
    sort?: Record<string, number>;
    filter?: Record<string, any>;
}

class MatchService {
    /**
     * Create a new match
     */
    async createMatch(matchData: Partial<MatchDocument>): Promise<MatchDocument> {
        try {
            const match = new MatchModel(matchData);
            return await match.save();
        } catch (error) {
            logger.error(`Match creation failed: ${error}`);
            throw error;
        }
    }

    /**
     * Get match by ID with populated teams
     */
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

    /**
     * Get paginated matches with advanced filtering and sorting
     */
    async getAllMatches(page: number, limit: number, options: PaginationOptions = {}): Promise<{
        matches: MatchDocument[];
        total: number;
        page: number;
        totalPages: number;
    }> {
        try {
            const {
                page = 1,
                limit = 10,
                sort = { 'matchDetails.date': -1 },
                filter = {}
            } = options;

            const paginationOptions = {
                page,
                limit,
                sort,
                lean: true,
                populate: [
                    { path: 'teams.home', select: 'name' },
                    { path: 'teams.away', select: 'name' }
                ]
            };

            const result = await MatchModel.paginate(filter, paginationOptions);

            return {
                matches: result.docs,
                total: result.totalDocs,
                page: result.page || 1,
                totalPages: result.totalPages || 1
            };
        } catch (error) {
            logger.error(`Matches retrieval failed: ${error}`);
            throw error;
        }
    }

    /**
     * Update a match by ID
     */
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