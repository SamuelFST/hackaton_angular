import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';

import User from '../../Objects/User';
import UserRegister from '../../Objects/UserRegister';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [MessageService, ConfirmationService],
})
export class HomeComponent implements OnInit {

  users: User[];
  user: UserRegister = { name: '', login: '', email: '', password: '', dateBirth: null };
  userToUpdate: any;
  nameSearch: string = '';
  userId: number;
  submitted: boolean;
  userDialog: boolean;
  cols: Object[];

  constructor(
    private userService: UserService,
    private messageService: MessageService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {

  }

  ngOnInit(): void {
    this.userService.listAll().subscribe((users) => {
      this.users = users;
    });

    this.cols = [
      { field: 'id', header: '#' },
      { field: 'name', header: 'Nome' },
      { field: 'email', header: 'E-mail' },
      { field: 'dateBirth', header: 'Nascimento' },
    ];

    this.user = { name: '', login: '', email: '', password: '', dateBirth: null };

    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.userId = params['id'];
        this.userService.findById(this.userId).subscribe((user: User) => {
          const userDate = user.dateBirth.toString().split('-');
          const formattedDate = `${Number(userDate[2])}-${userDate[1]}-${Number(userDate[0]) + 1}`;
          this.userToUpdate = {
            name: user.name,
            email: user.email,
            login: '',
            password: '',
            dateBirth: new Date(formattedDate),
            exists: true,
          };
        });
      }
    });
  }

  searchByName = () => {
    this.userService.searchByName(this.nameSearch).subscribe((users) => {
      this.users = users;
    });
  }

  saveUser = () => {
    this.submitted = true;
    this.userService.create(this.user).subscribe(
      (success) => this.messageService.add({
        severity: 'success',
        summary: 'Usuário criado',
        detail: `O usuário foi criado com sucesso!`
      }),
      (error) => this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: `Ocorreu um erro ao tentar criar o usuário`,
      }),
      () => {
        this.ngOnInit();
        this.hideDialog();
      },
    );;
  }

  changeToUpdateUserComponent = (id: number) => {
    this.router.navigate(['/home/update_user', id]);
  }

  updateUser = (id: number) => {
    this.userService.update(this.userToUpdate, id).subscribe(
      (success) => this.messageService.add({
        severity: 'success',
        summary: 'Usuário atualizado',
        detail: `O usuário foi atualizado com sucesso!`
      }),
      (error) => this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: `Ocorreu um erro ao tentar atualizar o usuário`,
      }),
      () => {
        this.ngOnInit();
        setTimeout(() => {
        this.router.navigate(['/home']);
          this.userToUpdate = {};
        }, 1000);
      }
    );
  }

  deleteUser = (id: number) => {
    this.userService.delete(id).subscribe(
      (success) => this.messageService.add({
        severity: 'success',
        summary: 'Usuário excluído',
        detail: `ID ${id} excluído com sucesso!`
      }),
      (error) => this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: `Ocorreu um erro ao tentar excluir o ID ${id}`,
      }),
      () => this.ngOnInit(),
    );
  }

  openNew() {
    this.user = { name: '', login: '', email: '', password: '', dateBirth: null };
    this.submitted = false;
    this.userDialog = true;
  }

  hideDialog() {
    this.userDialog = false;
    this.submitted = false;
  }

  returnToHome() {
    this.router.navigate(['/home']);
  }
}
