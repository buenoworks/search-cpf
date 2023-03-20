import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Partner } from 'src/app/models/partner.model';
import { PartnerService } from 'src/app/services/partner.service';

@Component({
  selector: 'partner-list',
  templateUrl: './partner-list.component.html',
  styleUrls: ['./partner-list.component.scss']
})
export class PartnerListComponent implements OnInit {
	public partners$: Observable<Array<Partner>> = of([]);

  constructor(private partnerService: PartnerService) { }

  ngOnInit(): void {

		this.partners$ = this.partnerService.partnerSubject.asObservable();
  }

  public get response(): boolean {
		return this.partnerService.response;
	}
}
