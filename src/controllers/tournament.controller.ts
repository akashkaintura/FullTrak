import { Request, Response } from 'express';
import TournamentService from '../services/tournament.service';
import { handleErrorResponse } from '../utils/error-handler';

class TournamentController {
    async createTournament(req: Request, res: Response) {
        try {
            const tournamentData = req.body;
            const tournament = await TournamentService.createTournament(tournamentData);
            res.status(201).json({
                success: true,
                data: tournament
            });
        } catch (error) {
            handleErrorResponse(res, error);
        }
    }

    async getTournamentById(req: Request, res: Response) {
        try {
            const { tournamentId } = req.params;
            const tournament = await TournamentService.getTournamentById(tournamentId);
            res.status(200).json({
                success: true,
                data: tournament
            });
        } catch (error) {
            handleErrorResponse(res, error);
        }
    }
}

export default new TournamentController();