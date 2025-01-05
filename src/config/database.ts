import mongoose from 'mongoose';
import { config } from './environment';
import logger from '../utils/logger';

class DatabaseConnection {
    private static instance: DatabaseConnection;

    private constructor() { }

    public static getInstance(): DatabaseConnection {
        if (!DatabaseConnection.instance) {
            DatabaseConnection.instance = new DatabaseConnection();
        }
        return DatabaseConnection.instance;
    }

    async connect() {
        try {
            await mongoose.connect(config.MONGODB_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                maxPoolSize: 50,
                socketTimeoutMS: 45000,
                retryWrites: true
            });

            mongoose.connection.on('connected', () => {
                logger.info('MongoDB connected successfully');
            });

            mongoose.connection.on('error', (err) => {
                logger.error(`MongoDB connection error: ${err}`);
            });

        } catch (error) {
            logger.error(`Database connection failed: ${error}`);
            process.exit(1);
        }
    }

    async disconnect() {
        await mongoose.connection.close();
        logger.info('MongoDB disconnected');
    }
}

export default DatabaseConnection.getInstance();