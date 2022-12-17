import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { BaseUserInterface } from './../interfaces/User/BaseUser.interface';
import sgMail from '@sendgrid/mail';

import User from '../models/User.model';
import HttpException from '../helpers/http-exception';
import hashPassword from '../helpers/hash-password';
import logger from '../helpers/logger';

// POST User  - /api/users
const createUser = async (req: Request, res: Response, next: NextFunction) => {
	const {
		first_name,
		last_name,
		username,
		email,
		password,
	}: BaseUserInterface = req.body;
	try {
		if (!first_name || !last_name || !username || !email || !password) {
			throw new HttpException(400, '', 'Missing required fields');
		}

		if (password.length < 8) {
			throw new HttpException(400, '', 'Password is too short');
		}

		const hashedPassword = await hashPassword(password);

		const user: any = await User.create({
			id: uuidv4(),
			first_name,
			last_name,
			username,
			email,
			password: hashedPassword,
		});

		// sgMail.setApiKey(`${process.env.SEND_GRID_API_KEY}`);
		// const msg = {
		// 	to: email,
		// 	from: 'support.3n2c1@simplelogin.com',
		// 	subject:
		// 		'Todo-APP - Confirm your email address to finish setting up your account.',
		// 	text: 'Token link will be added here',
		// 	html: '<strong>Can add HTML</strong>',
		// };

		// await sgMail.send(msg);

		return res.status(201).send({ success: true, data: user });
	} catch (error: any) {
		if (error.response) {
			return next(error.response.body);
		}

		if (error.name === 'SequelizeValidationError') {
			return res.status(400).send({ success: false, data: error.message });
		}
		next(error);
	}
};

export { createUser };
