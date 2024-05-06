import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { AppComponent } from 'src/app/app.component';
import { PostData } from 'src/app/models/post-data.model';
import { PostOptionsComponent } from '../post-options/post-options.component';
import { ReplyComponent } from '../reply/reply.component';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  @Input()
  postData!: PostData;
  creatorName: string = '';
  postDescription: string = '';
  postTime: number = 0;
  commentsCount: number = 0;
  public likesCount: number = 0;
  public likedByCurrentUser: boolean = false;
  firestore = new FirebaseTSFirestore();
  auth = new FirebaseTSAuth();

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getCreatorInfo();
    this.getPostInfo();
    this.checkIfLikedByCurrentUser();
    this.checkLikesCount();
  }

  onReplyClick() {
    this.dialog.open(ReplyComponent, {
      data: this.postData.postId,
    });
  }

  getCreatorInfo() {
    this.firestore.getDocument({
      path: ['Users', this.postData.creatorId],
      onComplete: (result) => {
        let userDocument = result.data();
        if (userDocument) {
          this.creatorName = userDocument['publicName'];
        }
      },
    });
  }
  getPostInfo() {
    this.firestore.listenToDocument({
      name: 'comments count',
      path: ['Posts', this.postData.postId],
      onUpdate: (result) => {
        let postDocument = result.data();
        if (postDocument) {
          this.postDescription = postDocument['description'];
          this.postTime = postDocument['timestamp'].seconds * 1000;
          this.commentsCount = postDocument['commentsCount'];
        }
      },
    });
  }

  onLikeClick() {
    var name = <string>this.auth.getAuth().currentUser?.uid;
    var postId = this.postData.postId;
    var currentLikesCount = 0;

    this.firestore.getDocument({
      path: ['Posts', postId, 'UsersLiking', name],
      onComplete: (result) => {
        if (result.exists) {
          this.firestore.delete({
            path: ['Posts', postId, 'UsersLiking', name],
          });
          this.firestore.getDocument({
            path: ['Posts', postId],
            onComplete: (result) => {
              let postDocument = result.data();
              if (postDocument) {
                currentLikesCount = postDocument['likesCount'];
                this.firestore.update({
                  path: ['Posts', postId],
                  data: {
                    likesCount: currentLikesCount - 1,
                  },
                  onComplete: (result) => {
                    this.likedByCurrentUser = false;
                  },
                });
              }
            },
          });
        } else {
          this.firestore.create({
            path: ['Posts', postId, 'UsersLiking', name],
            data: {
              username: AppComponent.getUserDocument()?.publicName,
            },
          });
          this.firestore.getDocument({
            path: ['Posts', postId],
            onComplete: (result) => {
              let postDocument = result.data();
              if (postDocument) {
                currentLikesCount = postDocument['likesCount'];
                this.firestore.update({
                  path: ['Posts', postId],
                  data: {
                    likesCount: currentLikesCount + 1,
                  },
                  onComplete: (result) => {
                    this.likedByCurrentUser = true;
                  },
                });
              }
            },
          });
        }
      },
    });
  }

  checkIfLikedByCurrentUser() {
    var name = <string>this.auth.getAuth().currentUser?.uid;
    var postId = this.postData.postId;

    this.firestore.listenToDocument({
      name: 'Check if liked',
      path: ['Posts', postId, 'UsersLiking', name],
      onUpdate: (result) => {
        if (result.exists) {
          this.likedByCurrentUser = true;
        } else {
          this.likedByCurrentUser = false;
        }
      },
    });
  }
  checkLikesCount() {
    var postId = this.postData.postId;

    this.firestore.listenToDocument({
      name: 'Check likes count',
      path: ['Posts', postId],
      onUpdate: (result) => {
        let postDocument = result.data();
        if (postDocument) {
          this.likesCount = postDocument['likesCount'];
        }
      },
    });
  }

  onPostOptionsClick() {
    this.dialog.open(PostOptionsComponent, { data: this.postData });
  }
}
