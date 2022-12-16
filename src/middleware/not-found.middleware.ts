import { Request, Response, NextFunction } from 'express';

// Catch all for not found endpoints
const notFoundHandler = (
	request: Request,
	response: Response,
	next: NextFunction
) => {
	const message = 'Resource not found';

	response.status(404).send({ success: false, data: message });
};

export default notFoundHandler;
