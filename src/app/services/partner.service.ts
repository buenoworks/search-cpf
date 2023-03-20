import {Injectable} from '@angular/core';
import {delay, map, of, Subject} from "rxjs";
import { PARTNERS } from "./mock-partners";
import { Partner } from '../models/partner.model';

@Injectable({
	providedIn: 'root'
})
export class PartnerService {

	public response: boolean = false;
	private partners$: Subject<Array<Partner>> = new Subject<Array<Partner>>();

	public constructor() {
	}

	public get partnerSubject(): Subject<Array<Partner>> {

		return this.partners$;

	}

	public searchPartners(search: string): Promise<boolean> {

		this.response = false;
		this.partners$.next([]);

		return new Promise((resolve, reject) => {
			of(PARTNERS).pipe(delay(2000), map(values => values.filter(value => value.cpf === search))).subscribe(results => {

				this.partners$.next(results);

				this.response = true;

				resolve(true);

			});
		});
	}
}
