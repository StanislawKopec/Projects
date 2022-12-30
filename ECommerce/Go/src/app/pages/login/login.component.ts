import { formatCurrency } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { LoginService } from 'src/app/service/login.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    LoggedIn: false,
  };
  wrongData: boolean = false;
  loginForm!: FormGroup;
  submitted = false;
  usernameDoesntExist = false;
  wrongPassword = false;

  constructor(
    public loginService: LoginService,
    private router: Router,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
  ) {}
  get userName() {
    return this.loginForm.get('userName');
  }
  get password() {
    return this.loginForm.get('password');
  }
  ngOnInit(): void {
    this.getAllUsers();
    this.loginForm = this.formBuilder.group({
      userName: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }
  getAllUsers() {
    this.loginService.getAllUsers().subscribe((response) => {
      this.users = response;
    });
  }

  onSubmit(): void {
    this.loginService
      .getUser(this.loginForm.get('userName')?.value.toString())
      .subscribe((response) => {
        if (response) {
          this.usernameDoesntExist = true;
        } else {
          this.usernameDoesntExist = false;
          this.login();

          this.loginService.isLogged.subscribe((response) => {
            if (response == true) {
              this.user.LoggedIn = true;
              this._snackBar.open('User logged in', '', {
                duration: 3000,
                panelClass: 'my-custom-snackbar',
              });
              this.router.navigate(['/home']);
            } else {
              this.wrongPassword = true;
            }
          });
          this.loginService.wrongData.subscribe((response) => {
            if (response == true) {
              this.wrongData = true;
            }
          });
        }
      });
  }

  login(): void {
    this.loginService.login(this.user.userName, this.user.password);
  }
}
