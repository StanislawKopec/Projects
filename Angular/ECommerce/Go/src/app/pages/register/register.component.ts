import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  //public nameForm: FormGroup;
  usernameExists: boolean = false;
  registerForm!: FormGroup;
  submitted = false;

  constructor(
    public loginService: LoginService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }
  get username() {
    return this.registerForm.get('username');
  }
  get password() {
    return this.registerForm.get('password');
  }
  onSubmit(): void {
    this.submitted = true;
    if (this.registerForm.get('username')?.value)
      this.loginService
        .getUser(this.registerForm.get('username')?.value.toString())
        .subscribe((response) => {
          if (response) {
            this.usernameExists = false;
            if (this.registerForm.invalid) {
              return;
            } else {
              this.loginService.registerUser(
                this.registerForm.get('username')?.value.toString(),
                this.registerForm.get('password')?.value.toString()
              );
              this._snackBar.open('User registered', '', {
                duration: 3000,
                panelClass: 'my-custom-snackbar',
              });
              this.router.navigate(['/login']);
            }
          } else {
            this.usernameExists = true;
            console.log('username exists');
          }
        });
  }
}
