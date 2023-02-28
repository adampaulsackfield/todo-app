// Imports
import request from 'supertest';
import { sequelize } from '../database';

// Server
import server from '../index';

// Database helpers
import preSeedFunction from '../database/pre-seed';
import seedFunction from '../database/seed';

// Before each test we want to seed the DB
beforeEach(() => {
	return sequelize.sync({ force: true }).then(() => {
		seedFunction('todo');
	});
});

// After each test we want to drop the DB
afterEach(() => {
	preSeedFunction('todo');
});

// After all tests we want to close the connection
afterAll(() => {
	sequelize.close();
});

const ENDPOINT = '/api/todos';

describe('TODOS', () => {
	describe('GET /api/todos', () => {
		it('should return an array or todos', () => {
			return request(server)
				.get(`${ENDPOINT}`)
				.expect(200)
				.then((res) => {
					expect(res.body.success).toBe(true);
					expect(res.body.data).toBeInstanceOf(Array);
					expect(res.body.data[0]).toMatchObject({
						title: expect.any(String),
						priority: expect.any(Number),
						created_at: expect.any(String),
					});
					expect(res.body.data.length).toBe(2);
				});
		});

		it('should be able to find todos using their title', () => {
			const searchTerm = 'Testing';

			const expectedResponse = [
				{
					id: '1',
					title: 'Finish Testing',
					priority: 3,
					created_at: expect.any(String),
					updated_at: expect.any(String),
				},
			];

			return request(server)
				.get(`${ENDPOINT}?title=${searchTerm}`)
				.expect(200)
				.then((res) => {
					expect(res.body.success).toBe(true);
					expect(res.body.data).toEqual(expectedResponse);
				});
		});

		it('should return an empty array if the title does not match any todos', () => {
			const searchTerm = 'I eat cats';

			const expectedResponse: any = [];

			return request(server)
				.get(`${ENDPOINT}?title=${searchTerm}`)
				.expect(200)
				.then((res) => {
					expect(res.body.success).toBe(true);
					expect(res.body.data).toEqual(expectedResponse);
				});
		});

		it('should be able to sort the results by priority in ascending order', () => {
			const searchTerm = 'ASC';

			const expectedResponse = [
				{
					id: '2',
					title: 'Finish Todos Endpoints',
					priority: 2,
					created_at: expect.any(String),
					updated_at: expect.any(String),
				},
				{
					id: '1',
					title: 'Finish Testing',
					priority: 3,
					created_at: expect.any(String),
					updated_at: expect.any(String),
				},
			];

			return request(server)
				.get(`${ENDPOINT}?priority=${searchTerm}`)
				.expect(200)
				.then((res) => {
					expect(res.body.data).toEqual(expectedResponse);
				});
		});

		it('should be able to sort the results by priority in descending order', () => {
			const searchTerm = 'DESC';

			const expectedResponse = [
				{
					id: '1',
					title: 'Finish Testing',
					priority: 3,
					created_at: expect.any(String),
					updated_at: expect.any(String),
				},
				{
					id: '2',
					title: 'Finish Todos Endpoints',
					priority: 2,
					created_at: expect.any(String),
					updated_at: expect.any(String),
				},
			];

			return request(server)
				.get(`${ENDPOINT}?priority=${searchTerm}`)
				.expect(200)
				.then((res) => {
					expect(res.body.data).toEqual(expectedResponse);
				});
		});
	});

	describe('POST /api/todos', () => {
		it('should return a status code of 201 and the newly created todo', () => {
			const todo = {
				title: 'Pass this test',
				priority: 1,
			};

			const expectedResponse = {
				id: expect.any(String),
				title: 'Pass this test',
				priority: 1,
				created_at: expect.any(String),
				updated_at: expect.any(String),
			};

			return request(server)
				.post(`${ENDPOINT}`)
				.send(todo)
				.expect(201)
				.then((res) => {
					expect(res.body.success).toBe(true);
					expect(res.body.data).toEqual(expectedResponse);
				});
		});

		it('should return a status code of 400 when not provided a priority', () => {
			const todo = {
				title: 'Set a priority',
			};

			const expectedResponse = 'Missing required fields';

			return request(server)
				.post(`${ENDPOINT}`)
				.send(todo)
				.expect(400)
				.then((res) => {
					expect(res.body.error).toEqual(expectedResponse);
				});
		});

		it('should return a status code of 400 when not provided a title', () => {
			const todo = {
				priority: 'high',
			};

			const expectedResponse = 'Missing required fields';

			return request(server)
				.post(`${ENDPOINT}`)
				.send(todo)
				.expect(400)
				.then((res) => {
					expect(res.body.error).toEqual(expectedResponse);
				});
		});
	});

	describe('GET /api/todos/:todoId', () => {
		it('should return a status code of 200 and the correct todo if the ID exists', () => {
			const todoId = 1;
			const title = 'Finish Testing';
			const priority = 3;

			return request(server)
				.get(`${ENDPOINT}/${todoId}`)
				.expect(200)
				.then((res) => {
					expect(res.body.success).toBe(true);
					expect(res.body.data.title).toEqual(title);
					expect(res.body.data.priority).toEqual(priority);
				});
		});

		it('should return a status code of 404 when the ID does not exist', () => {
			const todoId = 1123;
			const expectedResponse = `Todo with ID:${todoId} does not exist`;

			return request(server)
				.get(`${ENDPOINT}/${todoId}`)
				.expect(404)
				.then((res) => {
					expect(res.body.error).toEqual(expectedResponse);
				});
		});
	});

	describe('PUT /api/todos/:todoId', () => {
		it('should get a status code of 200 when updating the title', () => {
			const todoId = 1;
			const updatedTodo = {
				title: 'I was updated',
			};
			const expectedResponse = `Todo ID:${todoId} has been successfully updated`;

			return request(server)
				.put(`${ENDPOINT}/${todoId}`)
				.send(updatedTodo)
				.expect(200)
				.then((res) => {
					expect(res.body.success).toBe(true);
					expect(res.body.data).toEqual(expectedResponse);
				});
		});

		it('should get a status code of 200 when updating the priority', () => {
			const todoId = 1;
			const updatedTodo = {
				priority: 1,
			};
			const expectedResponse = `Todo ID:${todoId} has been successfully updated`;

			return request(server)
				.put(`${ENDPOINT}/${todoId}`)
				.send(updatedTodo)
				.expect(200)
				.then((res) => {
					expect(res.body.success).toBe(true);
					expect(res.body.data).toEqual(expectedResponse);
				});
		});

		it('should get a status code of 404 when the ID does not exist', () => {
			const todoId = 1123;
			const updatedTodo = {
				priority: 'low',
			};
			const expectedResponse = `Todo with ID:${todoId} does not exist`;

			return request(server)
				.put(`${ENDPOINT}/${todoId}`)
				.send(updatedTodo)
				.expect(404)
				.then((res) => {
					expect(res.body.error).toEqual(expectedResponse);
				});
		});
	});

	describe('DELETE /api/todos/:todoId', () => {
		it('should return a status code of 200 when successfully deleting a todo', () => {
			const todoId = 1;
			const expectedResponse = `Todo with ID:${todoId} has been deleted`;

			return request(server)
				.delete(`${ENDPOINT}/${todoId}`)
				.expect(200)
				.then((res) => {
					expect(res.body.success).toBe(true);
					expect(res.body.data).toEqual(expectedResponse);
				});
		});

		it('should return a status code of 404 when the ID does not exist', () => {
			const todoId = 1123;
			const expectedResponse = `Todo with ID:${todoId} does not exist`;

			return request(server)
				.delete(`${ENDPOINT}/${todoId}`)
				.expect(404)
				.then((res) => {
					expect(res.body.error).toEqual(expectedResponse);
				});
		});
	});
});
