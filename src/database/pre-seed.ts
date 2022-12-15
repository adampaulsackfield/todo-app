import Todo from '../models/Todo.model';

const preSeedFunction = () => {
	return Todo.destroy({
		where: {},
	});
};

export default preSeedFunction;
