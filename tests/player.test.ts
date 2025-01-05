import request from 'supertest';
import { app } from '../src/app';
import { PlayerModel } from '../src/models/Player.model';

describe('Player API', () => {
    beforeAll(async () => {
        await PlayerModel.deleteMany({});
    });

    it('should create a new player', async () => {
        const res = await request(app)
            .post('/api/players')
            .send({
                name: 'John Doe',
                country: 'Country A',
                role: 'Batsman',
                battingStyle: 'Right-Handed',
                dateOfBirth: '1990-01-01',
            });

        expect(res.statusCode).toEqual(201);
        expect(res.body.data.name).toEqual('John Doe');
    });

    it('should retrieve a player by ID', async () => {
        const player = await PlayerModel.create({
            name: 'Jane Doe',
            country: 'Country B',
            role: 'Bowler',
            battingStyle: 'Left-Handed',
            dateOfBirth: '1992-02-02',
        });

        const res = await request(app).get(`/api/players/${player._id}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.data.name).toEqual('Jane Doe');
    });
});