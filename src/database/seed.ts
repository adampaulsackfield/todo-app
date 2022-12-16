import Todo from '../models/Todo.model';

// Used to seed todos before testing begins
const seedFunction = () => {
	return Todo.bulkCreate([
		{
			id: 1,
			title: 'Finish Testing',
			priority: 'high',
			created_at: new Date(),
			updated_at: new Date(),
		},
		{
			id: 2,
			title: 'Finish Todos Endpoints',
			priority: 'medium',
			created_at: new Date(),
			updated_at: new Date(),
		},
	]);
};

export default seedFunction;
