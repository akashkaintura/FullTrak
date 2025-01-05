import mongoose from 'mongoose';
import { config } from '../src/config/environment';

beforeAll(async () => {
    await mongoose.connect(config.MONGODB_URI);
});

afterAll(async () => {
    await mongoose.connection.close();
});