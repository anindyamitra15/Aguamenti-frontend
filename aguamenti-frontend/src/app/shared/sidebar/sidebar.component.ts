import { AfterViewInit, Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { SidebarInterface } from 'src/app/dtos/sidebar.dtos';
import { ActivatedRoute, Router } from '@angular/router';


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
  currentRoute!: string;

  SidebarOptions: SidebarInterface[] = [
    { icon: 'visibility', item: 'Overview', value: 'overview' },
    { icon: 'pie_chart', item: 'Dashboard', value: '' },
    { icon: 'timer', item: 'Scheduling', value: 'scheduling' },
    { icon: 'event_note', item: 'Logs', value: 'logs' },
    { icon: 'settings', item: 'Settings', value: 'settings' },
  ];

  constructor(
    private bpObserver: BreakpointObserver,
    private router: Router,
  ) {
    this.sidenavOpenChange = new EventEmitter();
    this.onMobileView = new EventEmitter();
  }

  ngOnInit(): void {
    this.router.events
      .subscribe((e: any) => {
        this.currentRoute = e.url?.substring(1) ?? "";
      });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.bpObserver
        .observe(['(max-width: 800px)'])
        .subscribe((res) => {
          if (res.matches) {
            this.sidenav.close();
            this.onMobileView.emit(true);
          } else {
            this.sidenav.open();
            this.onMobileView.emit(false);
          }
        });
    }, 0);
  }

  onSelect(value: string) {
    this.router.navigate([value]);
    this.currentRoute = value;
  }

  sidenavState(isOpen: boolean) {
    this.sidenavOpenChange.emit(isOpen);
  }

}
