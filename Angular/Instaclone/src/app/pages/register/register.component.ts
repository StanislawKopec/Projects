import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  @Input() show: boolean | undefined;

  firestore: FirebaseTSFirestore;
  firebasetsAuth: FirebaseTSAuth;

  constructor(private router: Router) {
    this.firebasetsAuth = new FirebaseTSAuth();
    this.firestore = new FirebaseTSFirestore();
  }

  ngOnInit(): void {}

  onRegisterClick(
    registerEmail: HTMLInputElement,
    registerName: HTMLInputElement,
    registerUsername: HTMLInputElement,
    registerPassword: HTMLInputElement
  ) {
    let email = registerEmail.value;
    let name = registerName.value;
    let username = registerUsername.value;
    let password = registerPassword.value;
    if (
      this.isNotEmpty(email) &&
      this.isNotEmpty(password) &&
      this.isNotEmpty(name) &&
      this.isNotEmpty(username)
    ) {
      this.firestore.getCollection({
        path: ['Users'],
        where: [],
        onComplete: (result) => {
          result.docs.forEach((doc) => {
            let userDocument = doc.data();
            if (userDocument['publicName'] == username) {
              alert('username already exists');
              return;
            }
          });
          this.firebasetsAuth.createAccountWith({
            email: email,
            password: password,
            onComplete: (uc) => {
              this.firebasetsAuth.sendVerificationEmail();
              (registerEmail.value = ''), (registerPassword.value = '');
              if (uc.user?.uid != null) {
                this.firestore.create({
                  path: ['Users', uc.user.uid],
                  data: {
                    publicName: username,
                    realName: name,
                    profileImgUrl:
                      'https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg',
                  },
                  onComplete: (docId) => {
                    registerName.value = '';
                    registerUsername.value = '';
                  },
                  onFail: (err) => {
                    alert(err);
                  },
                });
              }
              this.router.navigate(['/login']);
            },
            onFail: (err) => {
              alert('Email already in use');
            },
          });
        },
      });
    }
  }

  isNotEmpty(text: string) {
    return text != null && text.length > 0;
  }
}
