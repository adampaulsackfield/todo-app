import chalk from 'chalk';

// Custom logger using Chalk to color the output
const logger = (message: string, level?: string): void => {
	if (level === 'INFO') return console.log(chalk.blueBright(message));
	if (level === 'WARN') return console.log(chalk.magentaBright(message));

	return console.log(chalk.redBright(message));
};

export default logger;
