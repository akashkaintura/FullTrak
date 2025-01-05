import express from 'express';
import { connectDatabase } from './config/database';
import matchRoutes from './routes/match.routes';
import deliveryRoutes from './routes/delivery.routes';
import cors from 'cors';
import { config } from './config/environment';
import logger from './utils/logger';
import playerRoutes from './routes/player.routes';
import teamRoutes from './routes/team.routes';
import tournamentRoutes from './routes/tournament.routes';
import { errorHandler } from './middleware/error.middleware';
import { corsOptions } from './config/cors';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';


export const app = express();

// Swagger API Documentation
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Cricket Analytics API',
            version: '1.0.0',
            description: 'API documentation for the Cricket Analytics application',
        },
        servers: [
            {
                url: `http://localhost:${config.PORT}`,
            },
        ],
    },
    apis: ['./src/routes/*.ts'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errorHandler);

// CORS
app.use(cors(corsOptions));

// Routes
app.use('/api/matches', matchRoutes);
app.use('/api/deliveries', deliveryRoutes);
app.use('/api/players', playerRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/tournaments', tournamentRoutes);


// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    logger.error(err.message);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
});

// Start Server
const startServer = async () => {
    await connectDatabase.connect();
    app.listen(config.PORT, () => {
        logger.info(`Server running on port ${config.PORT}`);
    });
};

startServer();