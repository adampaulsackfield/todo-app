// Imports
import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

// Custom Logger
import logger from './helpers/logger';

// Error Handlers
import errorHandler from './middleware/error.middleware';
import notFoundHandler from './middleware/not-found.middleware';

// Router Imports

// Middleware Imports
import connectDB from './database/connectDb';

// Load Environment Variables
dotenv.config();

// PORT & Server Setup
if (!process.env.PORT) process.exit(1); // If not ENV port then we will exit.
const PORT: number = parseInt(process.env.PORT as string, 10);
const server = express();

// Connect to DB
connectDB();

// Middleware
server.use(helmet());
server.use(cors());
server.use(express.json());

// Routes
server.use('/api/healthcheck', (req, res) =>
	res.send({ success: true, data: 'The server is up and running' })
);

// Error Handling
server.use(errorHandler);
server.use(notFoundHandler);

// Start the Server
server.listen(PORT, () => {
	logger(`Server is running on PORT:${PORT}`, 'INFO');
});
