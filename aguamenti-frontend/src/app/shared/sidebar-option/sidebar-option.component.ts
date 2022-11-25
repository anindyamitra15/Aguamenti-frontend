import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { SidebarInterface } from 'src/app/dtos/sidebar.dtos';
@Component({
  selector: 'app-sidebar-option',
  templateUrl: './sidebar-option.component.html',
  styleUrls: ['./sidebar-option.component.scss']
})
export class SidebarOptionComponent implements OnInit {
  @Input() option: SidebarInterface = {icon: '', item: '', value: ''};
  @Output() onSelect: EventEmitter<string>;
  constructor() {
    this.onSelect = new EventEmitter();
  }

  ngOnInit(): void {
  }

  onClick(selected: string) {
    this.onSelect.emit(selected)
  }

}
