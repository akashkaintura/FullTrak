import { Document, Types } from 'mongoose';

export interface TournamentDocument extends Document {
    name: string;
    year: number;
    format: 'ODI' | 'T20' | 'Test';
    startDate: Date;
    endDate: Date;
    teams: Types.ObjectId[];
    matches: Types.ObjectId[];
    winner?: Types.ObjectId;
    topScorer?: Types.ObjectId;
    topWicketTaker?: Types.ObjectId;
}