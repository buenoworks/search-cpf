import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'partner-card',
  templateUrl: './partner-card.component.html',
  styleUrls: ['./partner-card.component.scss']
})
export class PartnerCardComponent implements OnInit {
  @Input() data: any;

  constructor() { }

  ngOnInit(): void { }

}
