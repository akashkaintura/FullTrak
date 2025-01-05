import mongoose from 'mongoose';
import { config } from '../src/config/environment';
import logger from '../src/utils/logger';

// Define migration versions
const migrations: { [version: string]: (db: mongoose.Connection) => Promise<void> } = {
    '1.0.0': async (db: mongoose.Connection) => {
        // Example migration: Add a new field to a collection
        try {
            await db.collection('players').updateMany(
                {},
                { $set: { migrationVersion: '1.0.0' } }
            );
            logger.info('Migration 1.0.0 completed');
        } catch (error) {
            logger.error('Migration 1.0.0 failed', error);
            throw error;
        }
    },
    '1.1.0': async (db: mongoose.Connection) => {
        // Another example migration
        try {
            await db.collection('matches').updateMany(
                { result: { $exists: false } },
                { $set: { result: { status: 'Unknown' } } }
            );
            logger.info('Migration 1.1.0 completed');
        } catch (error) {
            logger.error('Migration 1.1.0 failed', error);
            throw error;
        }
    }
};

// Migration tracking collection
interface MigrationRecord {
    version: string;
    appliedAt: Date;
}

async function runMigrations() {
    try {
        // Connect to MongoDB
        const connection = await mongoose.connect(config.MONGODB_URI);
        const db = connection.connection;
        logger.info('Connected to MongoDB for migrations');

        // Ensure migrations collection exists
        const migrationCollection = db.collection('migrations');

        // Get current migration version
        const lastMigration = await migrationCollection
            .find()
            .sort({ appliedAt: -1 })
            .limit(1)
            .toArray();

        const currentVersion = lastMigration.length
            ? lastMigration[0].version
            : '0.0.0';

        // Determine migrations to run
        const migrationsToRun = Object.keys(migrations)
            .filter(version => compareVersions(version, currentVersion) > 0)
            .sort(compareVersions);

        // Run migrations
        for (const version of migrationsToRun) {
            logger.info(`Running migration to version ${version}`);
            await migrations[version](db);

            // Record migration
            await migrationCollection.insertOne({
                version,
                appliedAt: new Date()
            });
        }

        logger.info('All migrations completed successfully');
    } catch (error) {
        logger.error('Migration process failed', error);
    } finally {
        await mongoose.connection.close();
    }
}

// Version comparison function
function compareVersions(v1: string, v2: string): number {
    const v1Parts = v1.split('.').map(Number);
    const v2Parts = v2.split('.').map(Number);
    for (let i = 0; i < Math.max(v1Parts.length, v2Parts.length); i++) {
        const v1Part = v1Parts[i] || 0;
        const v2Part = v2Parts[i] || 0;
        if (v1Part !== v2Part) {
            return v1Part - v2Part;
        }
    }
    return 0;
}

// Execute migrations if script is run directly
if (require.main === module) {
    runMigrations();
}

export default runMigrations;