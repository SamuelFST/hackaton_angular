import { Component, OnInit } from '@angular/core';
import Provider from '../../Objects/Provider';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.css']
})
export class ProvidersComponent implements OnInit {

  providers: Provider[];
  totalProviders: number = 0;

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.userService.findAllEmailProviders().subscribe((providers) => {
      this.providers = providers;
      this.totalProviders = providers.length;
    });
  }
}
