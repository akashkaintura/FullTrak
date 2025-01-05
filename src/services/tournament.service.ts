import { TournamentModel } from '../models/Tournament.model';
import { TournamentDocument } from '../interfaces/tournament.interface';
import logger from '../utils/logger';

class TournamentService {
    async createTournament(tournamentData: Partial<TournamentDocument>): Promise<TournamentDocument> {
        try {
            const tournament = new TournamentModel(tournamentData);
            return await tournament.save();
        } catch (error) {
            logger.error(`Tournament creation failed: ${error}`);
            throw error;
        }
    }

    async getTournamentById(tournamentId: string): Promise<TournamentDocument | null> {
        try {
            return await TournamentModel.findById(tournamentId).populate('teams').lean();
        } catch (error) {
            logger.error(`Tournament retrieval failed: ${error}`);
            return null;
        }
    }
}

export default new TournamentService();