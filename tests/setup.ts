import mongoose from 'mongoose';
import { config } from '../src/config/environment';

beforeAll(async () => {
    if (config.MONGODB_URI) {
        await mongoose.connect(config.MONGODB_URI);
    } else {
        throw new Error('MONGODB_URI is not defined');
    }
});

afterAll(async () => {
    await mongoose.connection.close();
});