import Todo from '../models/Todo.model';
import User from '../models/User.model';

// Used to seed todos before testing begins
const seedFunction = (data: string) => {
	if (data === 'todo') {
		return Todo.bulkCreate([
			{
				id: 1,
				title: 'Finish Testing',
				priority: 3,
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 2,
				title: 'Finish Todos Endpoints',
				priority: 2,
				created_at: new Date(),
				updated_at: new Date(),
			},
		]);
	}

	if (data === 'user') {
		return User.bulkCreate([
			{
				id: 1,
				first_name: 'John',
				last_name: 'Smith',
				username: 'user1234',
				email: 'email12@example.com',
				password: 'password',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 2,
				first_name: 'Paul',
				last_name: 'Jones',
				username: 'user8888',
				email: 'email1123@example.com',
				password: 'password',
				created_at: new Date(),
				updated_at: new Date(),
			},
		]);
	}
};

export default seedFunction;
