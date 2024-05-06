import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  firebasetsAuth: FirebaseTSAuth;
  constructor(private router: Router) {
    this.firebasetsAuth = new FirebaseTSAuth();
  }

  ngOnInit(): void {}

  onResetClick(resetEmail: HTMLInputElement) {
    let email = resetEmail.value;
    if (this.isNotEmpty(email)) {
      this.firebasetsAuth.sendPasswordResetEmail({
        email: email,
        onComplete: (err) => {
          this.router.navigate(['/login']);
        },
      });
    }
  }
  isNotEmpty(text: string) {
    return text != null && text.length > 0;
  }
}
