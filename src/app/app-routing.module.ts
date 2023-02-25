import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BirthdaysComponent } from './pages/birthdays/birthdays.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { MenuComponent } from './pages/menu/menu.component';
import { ProvidersComponent } from './pages/providers/providers.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: MenuComponent, canActivate: [AuthGuardService] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuardService] },
  { path: 'home/update_user/:id', component: HomeComponent, canActivate: [AuthGuardService] },
  { path: 'providers', component: ProvidersComponent, canActivate: [AuthGuardService] },
  { path: 'birthdays', component: BirthdaysComponent, canActivate: [AuthGuardService] },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
