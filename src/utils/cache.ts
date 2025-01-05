import Redis from 'ioredis';
import { config } from '../config/environment';
import logger from './logger';

class CacheService {
    private client: Redis.Redis;

    constructor() {
        if (config.FEATURES.ENABLE_CACHING) {
            this.client = new Redis(config.REDIS_URI);

            this.client.on('error', (err) => {
                logger.error('Redis Client Error', err);
            });
        }
    }

    async set(key: string, value: any, expiry: number = 3600) {
        if (!config.FEATURES.ENABLE_CACHING) return;

        try {
            await this.client.set(key, JSON.stringify(value), 'EX', expiry);
        } catch (error) {
            logger.error(`Cache set error: ${error}`);
        }
    }

    async get(key: string) {
        if (!config.FEATURES.ENABLE_CACHING) return null;

        try {
            const cachedValue = await this.client.get(key);
            return cachedValue ? JSON.parse(cachedValue) : null;
        } catch (error) {
            logger.error(`Cache get error: ${error}`);
            return null;
        }
    }

    async delete(key: string) {
        if (!config.FEATURES.ENABLE_CACHING) return;

        try {
            await this.client.del(key);
        } catch (error) {
            logger.error(`Cache delete error: ${error}`);
        }
    }
}

export default new CacheService();