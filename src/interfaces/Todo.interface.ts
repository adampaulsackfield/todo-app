import { BaseTodoInterface } from './BaseTodo.interface';

// Complete TODO Interface
export interface TodoInterface extends BaseTodoInterface {
	id: number;
	created_at: Date;
	updated_at: Date;
}
