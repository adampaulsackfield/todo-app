import logger from '../helpers/logger';
import { sequelize } from '../database/';

const connectDB = async () => {
	try {
		await sequelize.sync();

		return logger('Connected to DB', 'INFO');
	} catch (error) {
		return logger(`Error: ${error}`);
	}
};

export default connectDB;
