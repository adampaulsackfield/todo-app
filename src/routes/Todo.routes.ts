import express from 'express';

import {
	getTodos,
	createTodo,
	getTodoById,
} from '../controllers/Todo.controller';

const todosRouter = express.Router();

todosRouter.route('/').get(getTodos).post(createTodo);

todosRouter.route('/:todoId').get(getTodoById);

export default todosRouter;
