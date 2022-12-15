import request from 'supertest';
import server from '../index';

import seedFunction from '../database/seed';

import { sequelize } from '../database';
import preSeedFunction from '../database/pre-seed';

beforeEach(() => {
	return sequelize.sync({ force: true }).then(() => {
		// Load the seed data into the database
		return seedFunction();
	});
});

afterEach(() => {
	return preSeedFunction();
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
						priority: expect.any(String),
						created_at: expect.any(String),
					});
					expect(res.body.data.length).toBe(2);
				});
		});
	});

	describe('POST /api/todos', () => {
		it('should return a status code of 201 and the newly created todo', () => {
			const todo = {
				title: 'Pass this test',
				priority: 'low',
			};

			const expectedResponse = {
				id: expect.any(String),
				title: 'Pass this test',
				priority: 'low',
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
});
