import Todo from '../models/Todo.model';
import User from '../models/User.model';

// Used to remove all todos and users before testing begins
const preSeedFunction = (data: string) => {
	if (data === 'todo') {
		return Todo.destroy({
			where: {},
		});
	}

	if (data === 'user') {
		return User.destroy({
			where: {},
		});
	}
};

export default preSeedFunction;
