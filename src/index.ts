// Imports
import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

// Error Handlers
import errorHandler from './middleware/error.middleware';
import notFoundHandler from './middleware/not-found.middleware';

// Router Imports
import todosRouter from './routes/Todo.routes';
import usersRouter from './routes/User.routes';

// Middleware Imports
import connectDB from './database/connectDb';

// Load Environment Variables
dotenv.config();

// Server
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

server.use('/api/todos', todosRouter);
server.use('/api/users', usersRouter);

// Error Handling
server.use(errorHandler);
server.use(notFoundHandler);

// Export Server - for ease of testing
export default server;
