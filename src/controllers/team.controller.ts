import { Request, Response } from 'express';
import TeamService from '../services/team.service';
import { handleErrorResponse } from '../utils/error-handler';

class TeamController {
    async createTeam(req: Request, res: Response) {
        try {
            const teamData = req.body;
            const team = await TeamService.createTeam(teamData);
            res.status(201).json({
                success: true,
                data: team
            });
        } catch (error) {
            handleErrorResponse(res, error);
        }
    }

    async getTeamById(req: Request, res: Response) {
        try {
            const { teamId } = req.params;
            const team = await TeamService.getTeamById(teamId);
            res.status(200).json({
                success: true,
                data: team
            });
        } catch (error) {
            handleErrorResponse(res, error);
        }
    }
}

export default new TeamController();