import {AccountType} from "./account.type.model";

export interface Account {
	number: string;
	type: AccountType;
	company: string;
}
