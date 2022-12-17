import jwt from 'jsonwebtoken';

const generateToken = (id: string): string => {
	const token = jwt.sign(
		{
			id,
			exp: Math.floor(Date.now() / 1000) + 60 * 60, // Token expires in one hour
		},
		`${process.env.JWT_SECRET}`
	);

	return token;
};

export default generateToken;
