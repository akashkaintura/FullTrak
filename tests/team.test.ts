import request from 'supertest';
import { app } from '../src/app';
import { TeamModel } from '../src/models/Team.model';

describe('Team API', () => {
    beforeAll(async () => {
        await TeamModel.deleteMany({});
    });

    it('should create a new team', async () => {
        const res = await request(app)
            .post('/api/teams')
            .send({
                name: 'Team A',
                country: 'Country A',
                captain: 'somePlayerId',
                coach: 'Coach A',
            });

        expect(res.statusCode).toEqual(201);
        expect(res.body.data.name).toEqual('Team A');
    });

    it('should retrieve a team by ID', async () => {
        const team = await TeamModel.create({
            name: 'Team B',
            country: 'Country B',
            captain: 'somePlayerId',
            coach: 'Coach B',
        });

        const res = await request(app).get(`/api/teams/${team._id}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.data.name).toEqual('Team B');
    });
});