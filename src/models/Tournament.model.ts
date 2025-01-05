import mongoose from 'mongoose';
import { TournamentDocument } from '../interfaces/tournament.interface';

const TournamentSchema = new mongoose.Schema<TournamentDocument>({
    name: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    format: {
        type: String,
        enum: ['ODI', 'T20', 'Test'],
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    teams: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team'
    }],
    matches: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Match'
    }],
    winner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team'
    },
    topScorer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player'
    },
    topWicketTaker: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player'
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Virtual to calculate tournament duration
TournamentSchema.virtual('duration').get(function () {
    return Math.ceil((this.endDate.getTime() - this.startDate.getTime()) / (1000 * 3600 * 24));
});

export const TournamentModel = mongoose.model<TournamentDocument>('Tournament', TournamentSchema);