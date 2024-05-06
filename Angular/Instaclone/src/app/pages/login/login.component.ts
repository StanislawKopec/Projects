import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  firebasetsAuth: FirebaseTSAuth;
  constructor(private router: Router, private app: AppComponent) {
    this.firebasetsAuth = new FirebaseTSAuth();
  }

  ngOnInit(): void {
    this.app.onLogout();
  }

  onLogin(loginEmail: HTMLInputElement, loginPassword: HTMLInputElement) {
    let email = loginEmail.value;
    let password = loginPassword.value;
    this.app.onLogout();

    if (this.isNotEmpty(email) && this.isNotEmpty(password)) {
      this.firebasetsAuth.signInWith({
        email: email,
        password: password,
        onComplete: (uc) => {
          this.app.loggedIn();
          this.router.navigate(['/home']);
        },
        onFail: (err) => {
          alert(err);
        },
      });
    }
  }
  isNotEmpty(text: string) {
    return text != null && text.length > 0;
  }
}
