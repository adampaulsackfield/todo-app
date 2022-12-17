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
		return seedFunction('user');
	});
});

// After each test we want to drop the DB
afterEach(() => {
	return preSeedFunction('user');
});

// After all tests we want to close the connection
afterAll(() => {
	sequelize.close();
});

const ENDPOINT = '/api/users';

describe('USERS', () => {
	describe('POST /api/users', () => {
		it('should return a status code of 201 and the newly created user, password should be hashed', () => {
			const user = {
				first_name: 'Test',
				last_name: 'User',
				username: 'username123',
				email: 'sackfieldadampaul@gmail.com',
				password: 'password123',
			};

			const expectedResponse = {
				id: expect.any(String),
				first_name: 'Test',
				last_name: 'User',
				username: 'username123',
				email: 'sackfieldadampaul@gmail.com',
				password: expect.any(String),
				created_at: expect.any(String),
				updated_at: expect.any(String),
			};

			return request(server)
				.post(`${ENDPOINT}`)
				.send(user)
				.expect(201)
				.then((res) => {
					expect(res.body.success).toBe(true);
					expect(res.body.data).toEqual(expectedResponse);
					expect(res.body.data.password).not.toEqual(user.password);
				});
		});

		it('should return a status code of 400 when providing a username that fails length validation (5-20)', () => {
			const user = {
				first_name: 'Test',
				last_name: 'User',
				username: 'test',
				email: 'email@example.com',
				password: 'password123',
			};

			const expectedResponse =
				'Validation error: Validation len on username failed';

			return request(server)
				.post(`${ENDPOINT}`)
				.send(user)
				.expect(400)
				.then((res) => {
					expect(res.body.data).toEqual(expectedResponse);
				});
		});

		it('should return a status code of 400 when not providing a username', () => {
			const user = {
				first_name: 'Test',
				last_name: 'User',
				username: '',
				email: 'email@example.com',
				password: 'password123',
			};

			const expectedResponse = 'Missing required fields';

			return request(server)
				.post(`${ENDPOINT}`)
				.send(user)
				.expect(400)
				.then((res) => {
					expect(res.body.error).toEqual(expectedResponse);
				});
		});

		it('should return a status code of 400 when not providing a password', () => {
			const user = {
				first_name: 'Test',
				last_name: 'User',
				username: 'test',
				email: 'email@example.com',
				password: '',
			};

			const expectedResponse = 'Missing required fields';

			return request(server)
				.post(`${ENDPOINT}`)
				.send(user)
				.expect(400)
				.then((res) => {
					expect(res.body.error).toEqual(expectedResponse);
				});
		});

		it('should return a status code of 400 when providing a password that fails length validation (< 8)', () => {
			const user = {
				first_name: 'Test',
				last_name: 'User',
				username: 'testuser',
				email: 'email@example.com',
				password: 'asd',
			};

			const expectedResponse = 'Password is too short';

			return request(server)
				.post(`${ENDPOINT}`)
				.send(user)
				.expect(400)
				.then((res) => {
					expect(res.body.error).toEqual(expectedResponse);
				});
		});
	});
});
