import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './layout/home/home.component';
import { LoginComponent } from './layout/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LogDisplayComponent } from './pages/log-display/log-display.component';
import { OverviewComponent } from './pages/overview/overview.component';
import { SchedulingComponent } from './pages/scheduling/scheduling.component';
import { SettingsComponent } from './pages/settings/settings.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: OverviewComponent,
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'scheduling',
        component: SchedulingComponent,
      },
      {
        path: 'logs',
        component: LogDisplayComponent,
      },
      {
        path: 'settings',
        component: SettingsComponent,
      },
    ]
  },
  {
    path: 'login',
    component: LoginComponent,
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
