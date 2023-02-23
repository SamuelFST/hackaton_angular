import { Component, OnInit } from '@angular/core';

import User from '../Objects/User';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-birthdays',
  templateUrl: './birthdays.component.html',
  styleUrls: ['./birthdays.component.css']
})
export class BirthdaysComponent implements OnInit {

  birthdayUsers: User[];
  totalBirthdays: number = 0;
  monthNumber: number;

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.userService.findAllBirthdayUsers(new Date().getMonth() + 1).subscribe((birthdayUsers) => {
      this.birthdayUsers = birthdayUsers;
      this.totalBirthdays = birthdayUsers.length;
    });
  }

  searchByMonthNumber = () => {
    this.userService.findAllBirthdayUsers(this.monthNumber).subscribe((birthdayUsers) => {
      this.birthdayUsers = birthdayUsers;
      this.totalBirthdays = birthdayUsers.length;
    });
  }
}
