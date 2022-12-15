import chalk from 'chalk';

const logger = (message: string, level?: string): void => {
	if (level === 'INFO') return console.log(chalk.blueBright(message));
	if (level === 'WARN') return console.log(chalk.magentaBright(message));

	return console.log(chalk.redBright(message));
};

export default logger;
