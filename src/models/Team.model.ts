import mongoose from 'mongoose';
import { TeamDocument } from '../interfaces/team.interface';

const TeamSchema = new mongoose.Schema<TeamDocument>({
    name: {
        type: String,
        required: true,
        unique: true
    },
    country: {
        type: String,
        required: true
    },
    captain: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player',
        required: true
    },
    coach: {
        type: String,
        required: true
    },
    players: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player'
    }],
    stats: {
        totalMatches: {
            type: Number,
            default: 0
        },
        wins: {
            type: Number,
            default: 0
        },
        losses: {
            type: Number,
            default: 0
        },
        draws: {
            type: Number,
            default: 0
        }
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Indexing
TeamSchema.index({ name: 1, country: 1 });

export const TeamModel = mongoose.model<TeamDocument>('Team', TeamSchema);