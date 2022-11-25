import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  houses = [
    "house 1", "home", "h2"
  ];
  houseSelect: FormControl;
  constructor() { 
    this.houseSelect = new FormControl(this.houses[0])
  }

  ngOnInit(): void {
  }

}
