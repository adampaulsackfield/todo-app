import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const authenticate = (req: any, res: Response, next: NextFunction): void => {
	const token = req.headers['authorization'];
	if (token) {
		jwt.verify(
			token,
			`${process.env.JWT_SECRET}`,
			(error: any, decoded: any) => {
				if (error) {
					res.status(401).json({ success: false, data: 'Invalid token' });
				} else {
					req.decoded = decoded;
					next();
				}
			}
		);
	} else {
		res.status(401).json({ success: false, data: 'No token provided' });
	}
};

export default authenticate;
