import { Document, Types } from 'mongoose';

export interface TeamDocument extends Document {
    name: string;
    country: string;
    captain: Types.ObjectId;
    coach: string;
    players: Types.ObjectId[];
    stats: {
        totalMatches: number;
        wins: number;
        losses: number;
        draws: number;
    };
}