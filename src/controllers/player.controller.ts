import { Request, Response } from 'express';
import PlayerService from '../services/player.service';
import { handleErrorResponse } from '../utils/error-handler';

class PlayerController {
    async createPlayer(req: Request, res: Response) {
        try {
            const playerData = req.body;
            const player = await PlayerService.createPlayer(playerData);
            res.status(201).json({
                success: true,
                data: player
            });
        } catch (error) {
            handleErrorResponse(res, error);
        }
    }

    async getPlayerById(req: Request, res: Response) {
        try {
            const { playerId } = req.params;
            const player = await PlayerService.getPlayerById(playerId);
            res.status(200).json({
                success: true,
                data: player
            });
        } catch (error) {
            handleErrorResponse(res, error);
        }
    }

    async searchPlayers(req: Request, res: Response) {
        try {
            const { name } = req.query;
            const players = await PlayerService.searchPlayersByName(name as string);
            res.status(200).json({
                success: true,
                data: players
            });
        } catch (error) {
            handleErrorResponse(res, error);
        }
    }
}

export default new PlayerController();