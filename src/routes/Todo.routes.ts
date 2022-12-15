import express from 'express';

import {
	getTodos,
	createTodo,
	getTodoById,
	updateTodoById,
	deleteTodoById,
} from '../controllers/Todo.controller';

const todosRouter = express.Router();

todosRouter.route('/').get(getTodos).post(createTodo);

todosRouter
	.route('/:todoId')
	.get(getTodoById)
	.put(updateTodoById)
	.delete(deleteTodoById);

export default todosRouter;
