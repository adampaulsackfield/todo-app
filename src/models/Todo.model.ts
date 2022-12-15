import Sequelize, { DataTypes } from 'sequelize';
import { sequelize } from '../database';

const Todo = sequelize.define(
	'Todo',
	{
		id: {
			type: DataTypes.STRING,
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
	},
	{ updatedAt: 'updated_at', createdAt: 'created_at' }
);

export default Todo;
