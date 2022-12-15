import * as dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config();

export const sequelize = new Sequelize(
	`${process.env.NODE_ENV === 'test' ? process.env.TEST_DB : process.env.DB}`,
	'root',
	'',
	{
		host: 'localhost',
		dialect: 'mysql',
	}
);
