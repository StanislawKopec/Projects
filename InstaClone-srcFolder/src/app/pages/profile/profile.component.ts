import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { AppComponent } from 'src/app/app.component';
import { User } from 'src/app/models/user.model';
import { SwitchAccountComponent } from '../components/switch-account/switch-account.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  toggleState: string = 'yourPhotos';
  auth = new FirebaseTSAuth();
  selectedImageFile: File | undefined;
  firestore = new FirebaseTSFirestore();
  currentUser: User | undefined;

  constructor(
    private dialog: MatDialog,
    private app: AppComponent,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.app.loggedUserData.subscribe((data) => {
      this.currentUser = data;
    });
  }

  openDialog(): void {
    this.dialog.open(SwitchAccountComponent, { panelClass: 'custom-modalbox' });
  }

  onChangeProfileImg(image: HTMLInputElement) {
    var name = this.auth.getAuth().currentUser?.uid;

    if (image.files) {
      this.selectedImageFile = image.files[0];

      if (!this.selectedImageFile) return;

      let fileReader = new FileReader();
      fileReader.readAsDataURL(this.selectedImageFile);
      fileReader.addEventListener('loadend', (ev) => {
        let readableString = fileReader.result?.toString();
        let profileImg = <HTMLImageElement>(
          document.getElementById('profile-image')
        );
        if (name)
          this.firestore.update({
            path: ['Users', name],
            data: { profileImageUrl: readableString },
          });
      });
    }
  }

  onLogoutClick() {
    this.app.onLogout();
    this.auth.getAuth().signOut();
    this.router.navigate(['/login']);
  }
}
