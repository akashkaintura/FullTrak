import { Request, Response } from 'express';
import { MatchService } from '../services/match.service';
import { handleErrorResponse } from '../utils/error-handler';

export const createMatch = async (req: Request, res: Response) => {
    try {
        const matchData = req.body;
        const match = await MatchService.createMatch(matchData);
        res.status(201).json({
            success: true,
            data: match
        });
    } catch (error) {
        handleErrorResponse(res, error);
    }
};

export const getMatchById = async (req: Request, res: Response): Promise<Response | void> => {
    try {
        const { id } = req.params;
        const match = await MatchService.getMatchById(id);

        if (!match) {
            return res.status(404).json({
                success: false,
                message: 'Match not found'
            });
        }

        res.status(200).json({
            success: true,
            data: match
        });
    } catch (error) {
        handleErrorResponse(res, error);
    }
};

export const getAllMatches = async (req: Request, res: Response) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;

        const result = await MatchService.getAllMatches(page, limit);

        res.status(200).json({
            success: true,
            data: result.matches,
            total: result.total
        });
    } catch (error) {
        handleErrorResponse(res, error);
    }
};

export const updateMatch = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const updatedMatch = await MatchService.updateMatch(id, updateData);

        if (!updatedMatch) {
            return res.status(404).json({
                success: false,
                message: 'Match not found'
            });
        }

        res.status(200).json({
            success: true,
            data: updatedMatch
        });
    } catch (error) {
        handleErrorResponse(res, error);
    }
};