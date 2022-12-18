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
				username: 'username123',
				password: expect.any(String),
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

	describe('POST /api/users/verify-email/:token', () => {
		it('should return a status code of 200 and the matching UserID', () => {
			const token =
				'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNzk2ZjYxLWE4OWEtNDY5OC1hOGMwLWJlOTE5OTM2Y2NhZCIsImV4cCI6MTY3MTMyNTU3OSwiaWF0IjoxNjcxMzIxOTc5fQ.s_qClhstmNdaZEGdSR9fNzchrwOl7T6gsYn7rGO9vP8';
			const id = '62796f61-a89a-4698-a8c0-be919936ccad';

			return request(server)
				.get(`${ENDPOINT}/verify-email/${token}`)
				.expect(200)
				.then((res) => {
					expect(res.body.success).toBe(true);
					expect(res.body.data.isVerified).toEqual(true);
					expect(res.body.data.id).toEqual(id);
				});
		});

		it('should return a status code of 400 if the token is invalid', () => {
			const token =
				'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImI0ZmIyNGI5LTMyMjgtNDkwNi05YjUzLWEzYmFhZDVmMGQyNyIsImV4cCI6MTY3MTMyNTI2MCwiaWF0IjoxNjcxMzIxNjYwfQ.oYWWIFJeGDIe7Ays0X0QwJFF7Vlf701GNKPntPMJ3Qa';

			return request(server)
				.get(`${ENDPOINT}/verify-email/${token}`)
				.expect(400)
				.then((res) => {
					expect(res.body.error).toEqual('Invalid token');
				});
		});

		it('should return a status code of 400 if the token has expired', () => {
			const token =
				'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImU5MDIxNzQ3LTRhNjQtNDc0NS1iZDNmLWJhN2EwMDRiNWUzOSIsImV4cCI6MTY3MTMyMDMyMCwiaWF0IjoxNjcxMzE2NzIwfQ.LRCHIRA1fzf7SjBjrcjqxHKM24plzAFE10OsueqGHzo';

			// TODO Implement tests for expired token
		});
	});
});
