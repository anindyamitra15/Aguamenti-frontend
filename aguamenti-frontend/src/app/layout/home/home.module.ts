import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatDividerModule } from '@angular/material/divider';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { HomeComponent } from './home.component';
import { DashboardComponent } from 'src/app/pages/dashboard/dashboard.component';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { OverviewComponent } from 'src/app/pages/overview/overview.component';
import { SchedulingComponent } from 'src/app/pages/scheduling/scheduling.component';
import { SettingsComponent } from 'src/app/pages/settings/settings.component';
import { LogDisplayComponent } from 'src/app/pages/log-display/log-display.component';
import { MatCardModule } from '@angular/material/card';
import { ScheduleComponent } from 'src/app/pages/scheduling/schedule/schedule.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    HomeComponent,
    DashboardComponent,
    OverviewComponent,
    SchedulingComponent,
    ScheduleComponent,
    SettingsComponent,
    LogDisplayComponent,
  ],
  providers: [
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: { duration: 800 }
    },
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    SharedModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    HttpClientModule,
    MatCardModule,
    MatSlideToggleModule,
    MatDialogModule
  ],
  exports: [
    HomeComponent,
    DashboardComponent,
    OverviewComponent,
    SchedulingComponent,
    ScheduleComponent,
    SettingsComponent,
    LogDisplayComponent,
  ]
})

export class HomeModule { }
