import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { PostData } from 'src/app/models/post-data.model';

@Component({
  selector: 'app-post-options',
  templateUrl: './post-options.component.html',
  styleUrls: ['./post-options.component.scss'],
})
export class PostOptionsComponent implements OnInit {
  isYourPost: boolean = false;
  auth = new FirebaseTSAuth();
  firestore = new FirebaseTSFirestore();

  constructor(
    @Inject(MAT_DIALOG_DATA) private postData: PostData,
    private dialog: MatDialogRef<PostOptionsComponent>
  ) {}

  ngOnInit(): void {
    this.checkIfYourPost();
  }

  onReportClick() {}
  onMoveToPostClick() {}
  onShareClick() {}
  onCopyLinkClick() {}

  onBackClick() {
    this.dialog.close();
  }
  onDeleteClick() {
    this.firestore.delete({
      path: ['Posts', this.postData.postId],
      onComplete: () => {
        this.dialog.close();
      },
    });
  }

  checkIfYourPost() {
    var name = <string>this.auth.getAuth().currentUser?.uid;

    if (this.postData.creatorId == name) this.isYourPost = true;
    else this.isYourPost = false;
  }
}
