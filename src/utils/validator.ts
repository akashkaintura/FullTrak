import Joi from 'joi';

export class Validator {
    static validateMatch(data: any) {
        const schema = Joi.object({
            matchId: Joi.string().required(),
            tournament: Joi.object({
                name: Joi.string().required(),
                year: Joi.number().required(),
                type: Joi.string().valid('ODI', 'T20', 'Test').required()
            }).required(),
            teams: Joi.object({
                home: Joi.string().required(),
                away: Joi.string().required()
            }).required(),
            matchDetails: Joi.object({
                date: Joi.date().required(),
                venue: Joi.string().required(),
                city: Joi.string().required(),
                country: Joi.string().required()
            }).required()
        });

        return schema.validate(data);
    }

    static validateDelivery(data: any) {
        const schema = Joi.object({
            matchId: Joi.string().required(),
            overNumber: Joi.number().required(),
            runsScored: Joi.number().required(),
            shotOutcome: Joi.string().valid('boundary', 'single', 'double', 'triple', 'out').required(),
            dismissalType: Joi.string().valid('LBW', 'caught', 'bowled', 'run out', 'stumped').optional(),
            inning: Joi.number().valid(1, 2).required(),
            ballNumber: Joi.number().required(),
            extraType: Joi.string().optional(),
            videoUrl: Joi.string().uri().optional(),
            currentRunRate: Joi.number().required(),
            target: Joi.number().optional()
        });

        return schema.validate(data);
    }
}