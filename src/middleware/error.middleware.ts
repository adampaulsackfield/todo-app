import HttpException from '../helpers/http-exception';

import { Request, Response, NextFunction } from 'express';

// Error handling middleware, uses our HTTP-exception
const errorHandler = (
	error: HttpException,
	request: Request,
	response: Response,
	next: NextFunction
) => {
	const status = error.statusCode || error.status || 500;

	response.status(status).send(error);
};

export default errorHandler;
