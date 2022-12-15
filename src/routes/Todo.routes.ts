import express from 'express';

import { getTodos, createTodo } from '../controllers/Todo.controller';

const todosRouter = express.Router();

todosRouter.route('/').get(getTodos).post(createTodo);

export default todosRouter;
