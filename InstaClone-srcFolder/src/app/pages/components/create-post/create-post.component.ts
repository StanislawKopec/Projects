import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FirebaseTSApp } from 'firebasets/firebasetsApp/firebaseTSApp';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { FirebaseTSStorage } from 'firebasets/firebasetsStorage/firebaseTSStorage';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
})
export class CreatePostComponent implements OnInit {
  selectedImageFile: File | undefined;
  auth = new FirebaseTSAuth();
  firestore = new FirebaseTSFirestore();
  storage = new FirebaseTSStorage();
  username: string = '';
  profilePic: string = '';

  constructor(private dialog: MatDialogRef<CreatePostComponent>) {}

  ngOnInit(): void {
    var name = <string>this.auth.getAuth().currentUser?.uid;
    this.firestore.getDocument({
      path: ['Users', name],
      onComplete: (result) => {
        let userDocument = result.data();
        if (userDocument) {
          this.username = userDocument['publicName'];
        }
      },
    });
    this.username = <string>this.auth.getAuth().currentUser?.displayName;
  }

  onPostClick(commentInput: HTMLTextAreaElement) {
    let comment = commentInput.value;
    let postId = this.firestore.genDocId();
    this.storage.upload({
      uploadName: 'upload Post',
      path: ['Posts', postId, 'image'],
      data: {
        data: this.selectedImageFile,
      },
      onComplete: (downloadUrl) => {
        this.firestore.create({
          path: ['Posts', postId],
          data: {
            description: comment,
            creatorId: this.auth.getAuth().currentUser?.uid,
            imageUrl: downloadUrl,
            timestamp: FirebaseTSApp.getFirestoreTimestamp(),
            commentsCount: 0,
            likesCount: 0,
          },
          onComplete: (docId) => {
            this.dialog.close();
          },
        });
      },
    });
  }

  onPhotoSelected(photoSelector: HTMLInputElement) {
    if (photoSelector.files) {
      this.selectedImageFile = photoSelector.files[0];

      if (!this.selectedImageFile) return;
      let fileReader = new FileReader();
      fileReader.readAsDataURL(this.selectedImageFile);
      fileReader.addEventListener('loadend', (ev) => {
        let readableString = fileReader.result?.toString();
        let postPreviewImage = <HTMLImageElement>(
          document.getElementById('post-preview-image')
        );
        if (readableString) {
          postPreviewImage.src = readableString;
        }
      });
    }
  }
}
