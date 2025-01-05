import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { MatchDocument, MatchFormat } from '../interfaces/match.interface';


interface MatchModelInterface extends mongoose.Model<MatchDocument> {
    paginate: (
        query?: any,
        options?: any
    ) => Promise<{
        docs: MatchDocument[];
        totalDocs: number;
        limit: number;
        page?: number;
        totalPages: number;
    }>;
}


const MatchSchema = new mongoose.Schema<MatchDocument>({
    matchId: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    tournament: {
        name: { type: String, required: true },
        year: { type: Number, required: true },
        type: {
            type: String,
            enum: Object.values(MatchFormat),
            required: true
        }
    },
    teams: {
        home: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Team',
            required: true
        },
        away: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Team',
            required: true
        }
    },
    matchDetails: {
        date: { type: Date, required: true },
        venue: { type: String, required: true },
        city: { type: String, required: true },
        country: { type: String, required: true }
    },
    result: {
        winner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Team'
        },
        margin: Number,
        method: String
    },
    performance: {
        totalRuns: { type: Number, default: 0 },
        totalWickets: { type: Number, default: 0 }
    },
    metadata: {
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
        version: { type: Number, default: 1 }
    }
}, {
    timestamps: true,
    optimisticConcurrency: true
});

MatchSchema.plugin(mongoosePaginate);
// Indexing Strategy
MatchSchema.index({
    'matchDetails.date': -1,
    'tournament.year': 1
});

export const MatchModel = mongoose.model<MatchDocument>('Match', MatchSchema);