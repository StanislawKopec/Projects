import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { BehaviorSubject } from 'rxjs';
import { User } from './models/user.model';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  styleUrls: [],
})
export class AppComponent {
  title = 'InstaClone';

  auth = new FirebaseTSAuth();
  firestore = new FirebaseTSFirestore();
  private static userDocument: UserDocument | undefined;
  private _authstate = new BehaviorSubject<boolean>(false);
  public authstate = this._authstate.asObservable();
  private _loggedUserData = new BehaviorSubject<User>({
    realName: '',
    publicName: '',
    profileImageUrl: '',
  });
  public loggedUserData = this._loggedUserData.asObservable();

  constructor(private router: Router) {
    this.auth.listenToSignInStateChanges((user) => {
      this.auth.checkSignInState({
        whenSignedIn: (user) => {
          this.firestore.listenToDocument({
            name: 'Getting Document',
            path: ['Users', user.uid],
            onUpdate: (result) => {
              AppComponent.userDocument = <UserDocument>result.data();
              AppComponent.userDocument.userId = user.uid;
              this.loggedIn();
              this.getLoggedUserData();
            },
          });
        },
        whenSignedOut: (user) => {
          this.onLogout();
          this._authstate.next(false);
          AppComponent.userDocument = undefined;
          this.router.navigate(['/login']);
        },
        whenSignedInAndEmailNotVerified: (user) => {
          //this.router.navigate(['/verifyEmail']);
        },
        whenSignedInAndEmailVerified: (user) => {},
        whenChanged: () => {},
      });
    });
  }

  getUsername() {
    try {
      return AppComponent.userDocument?.publicName;
    } catch (error) {
      return error;
    }
  }
  public static getUserDocument() {
    return AppComponent.userDocument;
  }

  loggedIn() {
    this._authstate.next(true);
    return this.auth.isSignedIn();
  }

  onLogout() {
    this._authstate.next(false);
    this.auth.signOut();
  }
  getLoggedUserData() {
    this.authstate.subscribe((state) => {
      if (state == true) {
        var name = this.auth.getAuth().currentUser?.uid;

        if (name)
          this.firestore.listenToDocument({
            name: 'get user data',
            path: ['Users', name],
            onUpdate: (result) => {
              let userDocument = result.data();
              if (userDocument)
                this._loggedUserData.next({
                  publicName: userDocument['publicName'],
                  realName: userDocument['realName'],
                  profileImageUrl: userDocument['profileImageUrl'],
                });
            },
          });
      }
    });
  }
}

export interface UserDocument {
  publicName: string;
  realName: string;
  userId: string;
}
