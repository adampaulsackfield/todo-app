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
				id: '62796f61-a89a-4698-a8c0-be919936ccad',
				first_name: 'Paul',
				last_name: 'Jones',
				username: 'user8888',
				email: 'email1123@example.com',
				password: 'password',
				created_at: new Date(),
				updated_at: new Date(),
				isVerified: false,
				token:
					'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNzk2ZjYxLWE4OWEtNDY5OC1hOGMwLWJlOTE5OTM2Y2NhZCIsImV4cCI6MTY3MTMyNTU3OSwiaWF0IjoxNjcxMzIxOTc5fQ.s_qClhstmNdaZEGdSR9fNzchrwOl7T6gsYn7rGO9vP8',
			},
		]);
	}
};

export default seedFunction;
