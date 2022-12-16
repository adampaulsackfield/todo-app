import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';

import { BaseTodoInterface } from './../interfaces/BaseTodo.interface';

import Todo from '../models/Todo.model';
import HttpException from '../helpers/http-exception';

// GET Todos - /api/todos
const getTodos = async (req: Request, res: Response) => {
	try {
		const todos: any[] = await Todo.findAll({});

		return res.status(200).send({ success: true, data: todos });
	} catch (error: any) {
		return res.status(404).send({ success: false, data: error.message });
	}
};

// POST Todo  - /api/todos
const createTodo = async (req: Request, res: Response, next: NextFunction) => {
	const { title, priority }: BaseTodoInterface = req.body;
	try {
		if (!title || !priority)
			throw new HttpException(400, '', 'Missing required fields');

		const todo: any = await Todo.create({
			id: uuidv4(),
			title,
			priority,
		});

		console.log(todo);
		return res.status(201).send({ success: true, data: todo.dataValues });
	} catch (error: any) {
		next(error);
	}
};

// GET Todo By ID - /api/todos/:todoId
const getTodoById = async (req: Request, res: Response, next: NextFunction) => {
	const { todoId } = req.params;

	try {
		const todo = await Todo.findByPk(todoId);

		if (!todo)
			throw new HttpException(404, '', `Todo with ID:${todoId} does not exist`);

		return res.status(200).send({ success: true, data: todo });
	} catch (error: any) {
		next(error);
	}
};

// PUT Update Todo By ID - /api/todos/:todoId
const updateTodoById = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { todoId } = req.params;

	try {
		const updatedTodo = await Todo.update(req.body, {
			where: { id: todoId },
		});
		if (updatedTodo[0] !== 1)
			throw new HttpException(404, '', `Todo with ID:${todoId} does not exist`);

		return res.status(200).send({
			success: true,
			data: `Todo ID:${todoId} has been successfully updated`,
		});
	} catch (error) {
		next(error);
	}
};

// DELETE Delete a Todo By ID - /api/todos/:todoId
const deleteTodoById = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { todoId } = req.params;
	try {
		const deleted = await Todo.destroy({
			where: {
				id: todoId,
			},
		});
		console.log(deleted);
		if (deleted !== 1)
			throw new HttpException(404, '', `Todo with ID:${todoId} does not exist`);

		return res.status(200).send({
			success: true,
			data: `Todo with ID:${todoId} has been deleted`,
		});
	} catch (error) {
		next(error);
	}
};

export { getTodos, createTodo, getTodoById, updateTodoById, deleteTodoById };
