import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'house-card',
  templateUrl: './house-card.component.html',
  styleUrls: ['./house-card.component.scss']
})
export class HouseCardComponent implements OnInit {

  @Input() house: any = { name: 'My house' };
  @Output() houseCardEvent: EventEmitter<{ action: "open" | "edit" | "delete", house: any }>;


  isHovered = false;

  constructor(
    public dialog: MatDialog,
  ) {

    this.houseCardEvent = new EventEmitter();
  }

  ngOnInit(): void {
  }

  open() {
    this.houseCardEvent.emit({ action: "open", house: this.house });
  }

  onMouse(hover: boolean) {
    this.isHovered = hover;
  }

  editHouse() {
    this.houseCardEvent.emit({action: "edit", house: this.house});
  }

  deleteHouse() {
    this.houseCardEvent.emit({action: "delete", house: this.house});
  }

}
