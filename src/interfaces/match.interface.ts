import { Document, Types } from 'mongoose';

export enum MatchFormat {
    ODI = 'ODI',
    T20 = 'T20',
    TEST = 'Test'
}

export interface MatchDocument extends Document {
    matchId: string;
    tournament: {
        name: string;
        year: number;
        type: MatchFormat;
    };
    teams: {
        home: Types.ObjectId;
        away: Types.ObjectId;
    };
    matchDetails: {
        date: Date;
        venue: string;
        city: string;
        country: string;
    };
    result: {
        winner: Types.ObjectId;
        margin?: number;
        method?: string;
    };
    performance: {
        totalRuns: number;
        totalWickets: number;
    };
    metadata: {
        createdAt: Date;
        updatedAt: Date;
        version: number;
    };
}