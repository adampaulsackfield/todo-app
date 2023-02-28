import bcrypt from 'bcrypt';

const saltRounds: number = 10;

const hashPassword = async (plaintextPassword: string) => {
	const hash = await bcrypt.hash(plaintextPassword, saltRounds);

	return hash;
};

export default hashPassword;
