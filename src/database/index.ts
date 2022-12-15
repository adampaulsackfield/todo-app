import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('todo_app', 'root', '', {
	host: 'localhost',
	dialect: 'mysql',
});
