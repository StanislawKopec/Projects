import { formatCurrency } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { LoginService } from 'src/app/service/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  users: User[] = [];
  user: User = {
    id: '',
    userName: '',
    password: '',
  };

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {
    this.getAllUsers();
  }
  getAllUsers() {
    this.loginService.getAllUsers().subscribe((response) => {
      this.users = response;
    });
  }

  onSubmit(form: NgForm): boolean {
    for (var i = 0; i < this.users.length; i++) {
      if (this.user.userName == this.users[i].userName) {
        if (this.user.password == this.users[i].password) {
          this.router.navigate(['/home']);
        } else return false;
      }
    }
    return false;
  }
}
