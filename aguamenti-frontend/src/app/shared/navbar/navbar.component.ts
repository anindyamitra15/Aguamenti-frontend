import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { USER_TOKEN } from 'src/app/dtos/cookie-fields';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input() shouldShowMenu: boolean = false;
  @Output() menuToggle: EventEmitter<boolean>;

  constructor(
    private cookie: CookieService,
    private router: Router
  ) {
    this.menuToggle = new EventEmitter();
  }

  ngOnInit(): void {
  }

  onMenuToggle() {
    this.menuToggle.emit(true);
  }


  logout(): void {
    this.cookie.set(USER_TOKEN, '');
    this.router.navigate(['login']);
  }

}
