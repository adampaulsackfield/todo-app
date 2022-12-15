import { TodoInterface } from './../interfaces/Todo.interface';
import Sequelize, { DataTypes } from 'sequelize';
import { sequelize } from '../database';

export interface TodoModel
	extends Sequelize.Model<TodoInterface>,
		TodoInterface {}

const Todo = sequelize.define<TodoModel>('Todo', {
	id: {
		type: DataTypes.INTEGER,
		allowNull: false,
		primaryKey: true,
	},
	title: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	priority: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	created_at: {
		type: DataTypes.DATE,
	},
	updated_at: {
		type: DataTypes.DATE,
	},
});

export default Todo;
