import express from 'express';

import { createUser } from '../controllers/User.controller';

const usersRouter = express.Router();

usersRouter.route('/').post(createUser);

export default usersRouter;
