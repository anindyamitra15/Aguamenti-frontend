import { AfterViewInit, Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { SidebarInterface } from 'src/app/dtos/sidebar.dtos';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, AfterViewInit {
  @Input() sidenavOpen: boolean = true;
  @Output() sidenavOpenChange: EventEmitter<boolean>;
  @Output() onMobileView: EventEmitter<boolean>;
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  SidebarOptions: SidebarInterface[] = [
    { icon: 'visibility', item: 'Overview', value: 'overview' },
    { icon: 'pie_chart', item: 'Dashboard', value: 'dashboard' },
    { icon: 'timer', item: 'Scheduling', value: 'scheduling' },
    { icon: 'event_note', item: 'Logs', value: 'logs' },
    { icon: 'settings', item: 'Settings', value: 'settings' },
  ];

  constructor(private observer: BreakpointObserver) {
    this.sidenavOpenChange = new EventEmitter();
    this.onMobileView = new EventEmitter();
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.observer
      .observe(['(max-width: 800px)'])
      .subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
          this.onMobileView.emit(true);
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
          this.onMobileView.emit(false);
        }
      });
  }

  onSelect(value: string) {
    console.log(value);
  }

  sidenavState(isOpen: boolean) {
    this.sidenavOpenChange.emit(isOpen);
  }

}
