import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  sidenavOpen!: boolean;
  mobileView!: boolean;
  constructor() { }

  ngOnInit(): void {
  }

  onMenuToggle() {
    this.sidenavOpen = !this.sidenavOpen;
    console.log(this.sidenavOpen)
  }

  onMobileView(isMobileView: boolean) {
    this.mobileView = isMobileView;
  }

}
