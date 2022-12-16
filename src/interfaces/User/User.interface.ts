import { BaseUserInterface } from './BaseUser.interface';

// Complete USER Interface
export interface UserInterface extends BaseUserInterface {
	id: number;
	created_at: Date;
	updated_at: Date;
}
