import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss'],
})
export class VerifyEmailComponent implements OnInit {
  auth = new FirebaseTSAuth();

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (
      this.auth.isSignedIn() &&
      !this.auth.getAuth().currentUser?.emailVerified
    ) {
      this.auth.sendVerificationEmail;
    } else {
      this.router.navigate(['/home']);
    }
  }

  onResendClick() {
    this.auth.sendVerificationEmail();
  }
}
