import { Account } from "./account.model";
import { Status } from "./status.model";


export interface Partner {
	cpf: string;
	name: string;
	status: Status;
	accounts?: Array<Account>;
}
