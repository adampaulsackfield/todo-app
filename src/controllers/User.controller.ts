import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { BaseUserInterface } from './../interfaces/User/BaseUser.interface';
import sgMail from '@sendgrid/mail';
import jwt from 'jsonwebtoken';

import User from '../models/User.model';
import HttpException from '../helpers/http-exception';
import hashPassword from '../helpers/hash-password';
import logger from '../helpers/logger';
import generateToken from '../helpers/generate-token';

// POST User  - /api/users
const createUser = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<Response | void> => {
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

		const id = uuidv4();

		const token = await generateToken(id);

		const user: any = await User.create({
			id,
			first_name,
			last_name,
			username,
			email,
			password: hashedPassword,
			token,
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

		return res.status(201).send({
			success: true,
			data: { id, username, password: hashedPassword },
		});
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

// POST User  - /api/users/verify-email/:token
const verifyEmail = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<Response | void> => {
	try {
		// Get the token from the request
		const { token }: any = req.params;

		// Verify the token
		const decoded: any = await jwt.verify(token, `${process.env.JWT_SECRET}`);

		// Check that the token is for the correct user
		const user: any = await User.findByPk(decoded.id);

		if (!user) {
			throw new HttpException(400, '', 'Invalid token');
		}

		// Check that the token has not expired
		if (decoded.exp < Date.now() / 1000) {
			throw new HttpException(400, '', 'Expired token');
		}

		// Mark the user's email as verified
		user.isVerified = true;

		await user.save();

		return res.status(200).send({
			success: true,
			data: { id: user.id, isVerified: user.isVerified },
		});
	} catch (error: any) {
		if (error.name === 'JsonWebTokenError') {
			return res.status(400).send({ error: 'Invalid token' });
		}
		next(error);
	}
};

export { createUser, verifyEmail };
