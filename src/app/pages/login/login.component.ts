import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';

import LoginRequest from '../../Objects/LoginRequest';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService, ConfirmationService],
})
export class LoginComponent implements OnInit {

  loginRequest: LoginRequest = new LoginRequest('', '');
  disabled: boolean = true;

  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  authenticate = () => {
    this.authService.authenticate(this.loginRequest).subscribe(
      (success) => {
        localStorage.setItem('isLogged', 'true');
        this.messageService.add({
          severity: 'success',
          summary: 'Autenticado com sucesso',
          detail: `Seja bem vindo!`
        });
        this.router.navigate(['/']);
        this.loginRequest = { login: '', password: '' };
      },
      (error) => {
        localStorage.removeItem('isLogged');
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: `Login e/ou senha estão incorretos`,
        });
      }
    );
  }
}
