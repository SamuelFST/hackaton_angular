import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BirthdaysComponent } from './birthdays/birthdays.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { ProvidersComponent } from './providers/providers.component';

const routes: Routes = [
  { path: '', component: MenuComponent },
  { path: 'home', component: HomeComponent },
  { path: 'home/update_user/:id', component: HomeComponent },
  { path: 'providers', component: ProvidersComponent },
  { path: 'birthdays', component: BirthdaysComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
