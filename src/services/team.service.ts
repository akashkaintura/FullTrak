import { TeamModel } from '../models/Team.model';
import { TeamDocument } from '../interfaces/team.interface';
import logger from '../utils/logger';

class TeamService {
    async createTeam(teamData: Partial<TeamDocument>): Promise<TeamDocument> {
        try {
            const team = new TeamModel(teamData);
            return await team.save();
        } catch (error) {
            logger.error(`Team creation failed: ${error}`);
            throw error;
        }
    }

    async getTeamById(teamId: string): Promise<TeamDocument | null> {
        try {
            return await TeamModel.findById(teamId).populate('players').lean();
        } catch (error) {
            logger.error(`Team retrieval failed: ${error}`);
            return null;
        }
    }

    async updateTeamStats(teamId: string, stats: Partial<TeamDocument['stats']>): Promise<TeamDocument | null> {
        try {
            return await TeamModel.findByIdAndUpdate(teamId, { $set: { stats } }, { new: true }).lean();
        } catch (error) {
            logger.error(`Team stats update failed: ${error}`);
            throw error;
        }
    }
}

export default new TeamService();