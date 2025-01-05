import mongoose from 'mongoose';
import dotenv from 'dotenv';
import logger from '../utils/logger';

dotenv.config();

const connectToDatabase = async () => {
    try {
        const mongoUri = process.env.MONGODB_URI;
        if (!mongoUri) {
            throw new Error('MONGODB_URI is not defined in environment variables');
        }

        await mongoose.connect(mongoUri, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
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
};

const disconnectFromDatabase = async () => {
    await mongoose.connection.close();
    logger.info('MongoDB disconnected');
};

export { connectToDatabase, disconnectFromDatabase };