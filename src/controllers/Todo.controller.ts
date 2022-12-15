import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';

import { BaseTodoInterface } from './../interfaces/BaseTodo.interface';

import Todo from '../models/Todo.model';
import HttpException from '../helpers/http-exception';

// GET Todos
const getTodos = async (req: Request, res: Response) => {
	try {
		const todos: any[] = await Todo.findAll({});

		return res.status(200).send({ success: true, data: todos });
	} catch (error: any) {
		return res.status(404).send({ success: false, data: error.message });
	}
};

// POST Todo
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
export { getTodos, createTodo };
