import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import { USER_TOKEN } from 'src/app/dtos/cookie-fields';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  sidenavOpen: boolean = false;
  mobileView: boolean = false;
  constructor(
    private cookie: CookieService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    const auth: string = this.cookie.get(USER_TOKEN);
    if (!auth)
      this.router.navigate(['login']);
  }

  onMenuToggle() {
    this.sidenavOpen = !this.sidenavOpen;
    console.log(this.sidenavOpen)
  }

  onMobileView(isMobileView: boolean) {
    this.mobileView = isMobileView;
  }

}
