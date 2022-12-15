import { BaseTodoInterface } from './BaseTodo.interface';

export interface TodoInterface extends BaseTodoInterface {
	id: number;
	created_at: Date;
	updated_at: Date;
}
