import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'hackathon-angular';
  items: MenuItem[];

  constructor(
    private primengConfig: PrimeNGConfig,
  ) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;

    this.items = [
      {
        label: 'Páginas',
        items: [
          {
            label: 'Menu',
            icon: 'pi pi-bars',
            url: '/'
          },
          {
            label: 'Home',
            icon: 'pi pi-home',
            url: '/home'
          },
          {
            label: 'Provedores',
            icon: 'pi pi-envelope',
            url: '/providers'
          },
          {
            label: 'Aniversariantes',
            icon: 'pi pi-calendar',
            url: '/birthdays'
          },
        ]
      }
    ];
  }
}
