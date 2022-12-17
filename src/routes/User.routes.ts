import express from 'express';

import { createUser, verifyEmail } from '../controllers/User.controller';

const usersRouter = express.Router();

usersRouter.route('/').post(createUser);
usersRouter.route('/verify-email/:token').get(verifyEmail);

export default usersRouter;
