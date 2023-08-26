import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidebarOptionComponent } from './sidebar-option/sidebar-option.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { DeviceCardComponent } from './device-card/device-card.component';
import { HouseCardComponent } from './house-card/house-card.component';
import { ScheduleCardComponent } from './schedule-card/schedule-card.component';
import { MatSliderModule } from '@angular/material/slider';
import { GenericModalComponent } from './modals/generic-modal/generic-modal.component';
import { AddHouseComponent } from './modals/add-house/add-house.component';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule } from '@angular/material/snack-bar';
import { ActionModalComponent } from './modals/action-modal/action-modal.component';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatSliderModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatDividerModule
  ],
  providers: [
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: { duration: 800 }
    },
  ],
  declarations: [
    NavbarComponent,
    FooterComponent,
    SidebarComponent,
    SidebarOptionComponent,
    DeviceCardComponent,
    HouseCardComponent,
    ScheduleCardComponent,
    GenericModalComponent,
    AddHouseComponent,
    ActionModalComponent,
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    SidebarComponent,
    DeviceCardComponent,
    HouseCardComponent,
    ScheduleCardComponent
  ]
})
export class SharedModule { }
