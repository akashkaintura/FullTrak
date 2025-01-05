import { Document, Types } from 'mongoose';

export interface DeliveryDocument extends Document {
    matchId: Types.ObjectId;
    overNumber: number;
    runsScored: number;
    shotOutcome: string;
    dismissalType?: string;
    inning: number;
    ballNumber: number;
    extraType?: string;
    videoUrl?: string;
    currentRunRate: number;
    target?: number;
}