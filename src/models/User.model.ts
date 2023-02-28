import { DataTypes } from 'sequelize';
import { sequelize } from '../database';

const User = sequelize.define(
	'User',
	{
		id: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true,
		},
		first_name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		last_name: {
			type: DataTypes.STRING,
		},
		username: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [5, 20],
			},
			unique: true,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				isEmail: true,
			},
			unique: true,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [8, 100],
			},
		},
	},
	{
		updatedAt: 'updated_at',
		createdAt: 'created_at',
		defaultScope: {
			attributes: { exclude: ['password'] },
		},
	}
);

export default User;
