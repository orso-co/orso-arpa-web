import { Route } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from '@arpa/dashboard';
import { PersonsComponent } from '@arpa/persons';
import { AuditLogsComponent } from '@arpa/admin';

export const appRoutes: Route[] = [
  {
    path: '',
    component: LayoutComponent,
    pathMatch: 'prefix',
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'persons',
        component: PersonsComponent,
      },
      {
        path: 'auditlogs',
        component: AuditLogsComponent
      }
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];
