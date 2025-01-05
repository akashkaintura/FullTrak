import mongoose from 'mongoose';
import { config } from '../src/config/environment';
import { PlayerModel } from '../src/models/Player.model';
import { TeamModel } from '../src/models/Team.model';
import { MatchModel } from '../src/models/Match.model';
import { DeliveryModel } from '../src/models/Delivery.model';
import { TournamentModel } from '../src/models/Tournament.model';
import logger from '../src/utils/logger';

// Sample data generation functions
const generatePlayers = () => [
    {
        name: 'Virat Kohli',
        country: 'India',
        role: 'Batsman',
        battingStyle: 'Right-Handed',
        bowlingStyle: 'Right-arm medium',
        dateOfBirth: new Date('1988-11-05'),
        stats: {
            matches: 250,
            runs: 12000,
            wickets: 4,
            average: 59.07,
            strikeRate: 93.2
        }
    },
    {
        name: 'Steve Smith',
        country: 'Australia',
        role: 'Batsman',
        battingStyle: 'Right-Handed',
        dateOfBirth: new Date('1989-06-02'),
        stats: {
            matches: 200,
            runs: 8000,
            wickets: 0,
            average: 62.84,
            strikeRate: 91.5
        }
    }
];

const generateTeams = (playerIds: string[]) => [
    {
        name: 'India National Cricket Team',
        country: 'India',
        captain: playerIds[0],
        coach: 'Rahul Dravid',
        players: playerIds,
        stats: {
            totalMatches: 500,
            wins: 300,
            losses: 150,
            draws: 50
        }
    }
];

const generateTournaments = (teamIds: string[]) => [
    {
        name: 'ICC Cricket World Cup',
        year: 2023,
        format: 'ODI',
        startDate: new Date('2023-10-01'),
        endDate: new Date('2023-11-15'),
        teams: teamIds,
        matches: []
    }
];

const generateMatches = (teamIds: string[], tournamentIds: string[]) => [
    {
        matchId: 'match_2023_001',
        tournament: tournamentIds[0],
        teams: {
            home: teamIds[0],
            away: teamIds[0] // Replace with another team in real scenario
        },
        matchDetails: {
            date: new Date('2023-10-15'),
            venue: 'Wankhede Stadium',
            city: 'Mumbai',
            country: 'India'
        },
        result: {
            winner: teamIds[0],
            margin: 50,
            method: 'Runs'
        },
        performance: {
            totalRuns: 300,
            totalWickets: 10
        }
    }
];

const generateDeliveries = (matchId: string) => [
    {
        matchId: matchId,
        overNumber: 1,
        runsScored: 4,
        shotOutcome: 'Boundary',
        inning: 1,
        ballNumber: 1,
        currentRunRate: 6.0
    },
    {
        matchId: matchId,
        overNumber: 1,
        runsScored: 2,
        shotOutcome: 'Single',
        inning: 1,
        ballNumber: 2,
        currentRunRate: 6.2
    }
];

async function seedDatabase() {
    try {
        // Connect to MongoDB
        await mongoose.connect(config.MONGODB_URI);
        logger.info('Connected to MongoDB');

        // Clear existing data
        await PlayerModel.deleteMany({});
        await TeamModel.deleteMany({});
        await MatchModel.deleteMany({});
        await DeliveryModel.deleteMany({});
        await TournamentModel.deleteMany({});

        // Seed Players
        const players = generatePlayers();
        const savedPlayers = await PlayerModel.insertMany(players);
        const playerIds = savedPlayers.map((player: any) => player._id);

        // Seed Teams
        const teams = generateTeams(playerIds);
        const savedTeams = await TeamModel.insertMany(teams);
        const teamIds = savedTeams.map((team: { _id: any; }) => team._id);

        // Seed Tournaments
        const tournaments = generateTournaments(teamIds);
        const savedTournaments = await TournamentModel.insertMany(tournaments);
        const tournamentIds = savedTournaments.map((tournament: { _id: any; }) => tournament._id);

        // Seed Matches
        const matches = generateMatches(teamIds, tournamentIds);
        const savedMatches = await MatchModel.insertMany(matches);
        const matchIds = savedMatches.map((match: { _id: any; }) => match._id);

        // Seed Deliveries
        const deliveries = generateDeliveries(matchIds[0]);
        await DeliveryModel.insertMany(deliveries);

        logger.info('Database seeded successfully');
    } catch (error) {
        logger.error('Seeding failed', error);
    } finally {
        await mongoose.connection.close();
    }
}

// Execute seeding if script is run directly
if (require.main === module) {
    seedDatabase();
}

export default seedDatabase;