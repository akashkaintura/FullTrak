import mongoose from 'mongoose';
import { PlayerDocument, PlayerRole } from '../interfaces/player.interface';

const PlayerSchema = new mongoose.Schema<PlayerDocument>({
    name: {
        type: String,
        required: true,
        trim: true
    },
    country: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: Object.values(PlayerRole),
        required: true
    },
    battingStyle: {
        type: String,
        required: true
    },
    bowlingStyle: {
        type: String,
        default: null
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    stats: {
        matches: {
            type: Number,
            default: 0
        },
        runs: {
            type: Number,
            default: 0
        },
        wickets: {
            type: Number,
            default: 0
        },
        average: {
            type: Number,
            default: 0
        },
        strikeRate: {
            type: Number,
            default: 0
        }
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Virtual Properties
PlayerSchema.virtual('age').get(function () {
    const today = new Date();
    const birthDate = this.dateOfBirth;
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age;
});

export const PlayerModel = mongoose.model<PlayerDocument>('Player', PlayerSchema);