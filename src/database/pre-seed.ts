import Todo from '../models/Todo.model';

// Used to remove all todos before testing begins
const preSeedFunction = () => {
	return Todo.destroy({
		where: {},
	});
};

export default preSeedFunction;
