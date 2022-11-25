import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input() shouldShowMenu!: boolean;
  @Output() menuToggle: EventEmitter<boolean>;
  constructor() {
    this.menuToggle = new EventEmitter();
  }

  ngOnInit(): void {
  }

  onMenuToggle(){
    this.menuToggle.emit(true);
  }

}
