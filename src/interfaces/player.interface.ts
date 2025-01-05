import { Document, Types } from 'mongoose';

export enum PlayerRole {
    BATSMAN = 'Batsman',
    BOWLER = 'Bowler',
    ALL_ROUNDER = 'All-Rounder',
    WICKET_KEEPER = 'Wicket-Keeper'
}

export interface PlayerDocument extends Document {
    name: string;
    country: string;
    role: PlayerRole;
    battingStyle: string;
    bowlingStyle?: string;
    dateOfBirth: Date;
    stats: {
        matches: number;
        runs: number;
        wickets: number;
        average: number;
        strikeRate: number;
    };
}