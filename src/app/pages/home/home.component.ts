import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable, of } from 'rxjs';
import { Partner } from 'src/app/models/partner.model';
import { PartnerService } from 'src/app/services/partner.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public form: FormGroup;
	public loaded: string = '';
	public loading: boolean = false;
	
	public partners$: Observable<Array<Partner>> = of([]);

  constructor(private formBuilder: FormBuilder, private partnerService: PartnerService) { 
    this.form = this.formBuilder.group({
			searchCPF: [null, Validators.compose([
				Validators.required,
				Validators.minLength(14),
				Validators.maxLength(14),
				Validators.pattern(/^(\d{3}\.){2}\d{3}\-\d{2}$/)]
			)],
		});
  }

  ngOnInit(): void {
	this.partners$ = this.partnerService.partnerSubject.asObservable();
  }

  public search(): void {

		this.loading = true;

		if (this.form.valid) {

			this.partnerService.searchPartners(this.form.value.searchCPF.replace(/\D/g, '')).then(_ => {
				this.loading = false;
				this.loaded = this.form.value.searchCPF;
			});

		} else {

			Object.keys(this.form.controls).some(field => {

				if (this.form.controls[field].status === 'INVALID') {
					this.form.controls[field].markAsTouched();
					const control = document.getElementById(field) as HTMLInputElement;
					control.focus();
					this.loading = false;
          
					return true;
				}
				return false;
			});
		}
	}
}
