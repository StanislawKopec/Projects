import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppComponent } from 'src/app/app.component';
import { User } from 'src/app/models/user.model';
import { CreatePostComponent } from '../create-post/create-post.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  currentUser: User | undefined;
  constructor(private dialog: MatDialog, private app: AppComponent) {}

  ngOnInit(): void {
    this.app.loggedUserData.subscribe((data) => {
      this.currentUser = data;
    });
  }
  onCreatePostClick() {
    this.dialog.open(CreatePostComponent, { panelClass: 'custom-modalbox' });
  }
}
