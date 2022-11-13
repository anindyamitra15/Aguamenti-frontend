import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Input() sidebar: boolean = false;
  @Output() sidebarEvent: EventEmitter<boolean>;
  constructor() {
    this.sidebarEvent = new EventEmitter<boolean>();
  }

  ngOnInit(): void {
  }

}
