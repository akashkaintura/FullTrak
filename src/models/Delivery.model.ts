import mongoose from 'mongoose';
import { DeliveryDocument } from '../interfaces/delivery.interface';

const DeliverySchema = new mongoose.Schema<DeliveryDocument>({
    matchId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Match',
        required: true
    },
    overNumber: {
        type: Number,
        required: true
    },
    runsScored: {
        type: Number,
        required: true
    },
    shotOutcome: {
        type: String,
        required: true
    },
    dismissalType: {
        type: String,
        enum: ['LBW', 'caught', 'bowled', 'run out', 'stumped'],
        default: null
    },
    inning: {
        type: Number,
        required: true
    },
    ballNumber: {
        type: Number,
        required: true
    },
    extraType: {
        type: String,
        default: null
    },
    videoUrl: {
        type: String,
        default: null
    },
    currentRunRate: {
        type: Number,
        required: true
    },
    target: {
        type: Number,
        default: null
    }
}, {
    timestamps: true
});

export const DeliveryModel = mongoose.model<DeliveryDocument>('Delivery', DeliverySchema);