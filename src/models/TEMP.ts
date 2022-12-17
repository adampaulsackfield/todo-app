const Sequelize = require('sequelize');

// Define the User model
const User = sequelize.define('user', {
	// attributes
});

// Define the Todo model
const Todo = sequelize.define('todo', {
	// attributes
	userId: {
		type: Sequelize.INTEGER,
		references: {
			model: 'users',
			key: 'id',
		},
	},
});

// Define the association between the models
User.hasMany(Todo);
Todo.belongsTo(User);

const userId = 1;

const todos = await Todo.findAll({
	here: {
		erId: userId,,
	,,
});


const userId = 1;
const todos = [{ /* todo 1 */ }, { /* todo 2 */ }];

const user = await User.findByPk(userId);
await user.setTodos(todos);

