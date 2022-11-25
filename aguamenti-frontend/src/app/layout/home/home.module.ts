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
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    HomeComponent,
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    SharedModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    HttpClientModule,
  ],
  exports: [
    HomeComponent,
    DashboardComponent,
  ]
})
export class HomeModule { }
