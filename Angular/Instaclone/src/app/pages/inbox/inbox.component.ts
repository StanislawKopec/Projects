import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FirebaseTSApp } from 'firebasets/firebasetsApp/firebaseTSApp';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import {
  FirebaseTSFirestore,
  OrderBy,
} from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { AppComponent } from 'src/app/app.component';
import { NewDirectComponent } from '../components/new-direct/new-direct.component';
import { SwitchAccountComponent } from '../components/switch-account/switch-account.component';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss'],
})
export class InboxComponent implements OnInit {
  @ViewChild('scroll') scroll: any;

  auth: FirebaseTSAuth;
  firestore: FirebaseTSFirestore = new FirebaseTSFirestore();
  chats: Chat[] = [];
  currentChatId: string = '';
  currentChatMessages: Message[] = [];
  currentChatUser: string = '';
  currentChatImage: string = '';
  currentUserName: string = '';
  selectedImageFile: File | undefined;

  constructor(private dialog: MatDialog, private app: AppComponent) {
    this.auth = new FirebaseTSAuth();
  }

  ngOnInit(): void {
    this.app.authstate.subscribe((state) => {
      if (state == true) {
        this.getChats();
        this.currentUserName = <string>this.app.getUsername();
      }
    });
  }

  openDialog(): void {
    this.dialog.open(SwitchAccountComponent, { panelClass: 'custom-modalbox' });
  }
  openDirectDialog() {
    this.dialog.open(NewDirectComponent, { panelClass: 'custom-modalbox' });
  }

  getChats() {
    var name = <string>this.auth.getAuth().currentUser?.uid;

    this.firestore.listenToCollection({
      name: 'chats',
      path: ['Users', name, 'Chats'],
      where: [],
      onUpdate: (result) => {
        this.chats = [];
        result.docs.forEach((docId) => {
          this.firestore.getDocument({
            path: ['Users', docId.id],
            onComplete: (result) => {
              let doc = result.data();
              if (doc) {
                var chatName: string = doc['publicName'].toString();
                var chatId: string = docId.id.toString();
                var chatImage: string;
                if (!doc['profileImageUrl'])
                  chatImage =
                    'https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg';
                else {
                  chatImage = doc['profileImageUrl'].toString();
                }
                var chat: Chat = {
                  id: chatId,
                  name: chatName,
                  imageUrl: chatImage,
                };
                this.chats.push(chat);
              }
            },
          });
        });
      },
    });
  }
  chooseChatClick(chat: Chat) {
    this.currentChatId = chat.id;
    this.currentChatUser = chat.name;
    this.currentChatImage = chat.imageUrl;
    this.getMessages();
    setTimeout(() => {
      this.scroll.nativeElement.scrollTop =
        this.scroll.nativeElement.scrollHeight;
    }, 300);
  }

  getMessages() {
    var name = <string>this.auth.getAuth().currentUser?.uid;
    this.firestore.stopListeningTo('Messages');
    this.currentChatMessages = [];
    this.firestore.listenToCollection({
      name: 'Messages',
      path: ['Users', name, 'Chats', this.currentChatId, 'Messages'],
      where: [new OrderBy('timestamp', 'asc')],
      onUpdate: (result) => {
        result.docChanges().forEach((message) => {
          if (message.type == 'added') {
            this.currentChatMessages.push(<Message>message.doc.data());
          }
        });
      },
    });
  }

  onSendClick(messageInput: HTMLInputElement) {
    var name = <string>this.auth.getAuth().currentUser?.uid;

    if (!(messageInput.value.length > 0)) return;
    this.firestore.create({
      path: ['Users', this.currentChatId, 'Chats', name, 'Messages'],
      data: {
        message: messageInput.value,
        creatorId: AppComponent.getUserDocument()?.userId,
        creatorName: AppComponent.getUserDocument()?.publicName,
        timestamp: FirebaseTSApp.getFirestoreTimestamp(),
      },
      onComplete: (docId) => {
        messageInput.value = '';
        this.scroll.nativeElement.scrollTop =
          this.scroll.nativeElement.scrollHeight;
        console.log(this.currentChatId, name);
      },
    });
    this.firestore.create({
      path: ['Users', name, 'Chats', this.currentChatId, 'Messages'],
      data: {
        message: messageInput.value,
        creatorId: AppComponent.getUserDocument()?.userId,
        creatorName: AppComponent.getUserDocument()?.publicName,
        timestamp: FirebaseTSApp.getFirestoreTimestamp(),
      },
    });
  }
  onPhotoSelected(photoSelector: HTMLInputElement) {
    var name = <string>this.auth.getAuth().currentUser?.uid;
    if (photoSelector.files) {
      this.selectedImageFile = photoSelector.files[0];

      if (!this.selectedImageFile) return;
      let fileReader = new FileReader();
      fileReader.readAsDataURL(this.selectedImageFile);
      fileReader.addEventListener('loadend', (ev) => {
        let readableString = fileReader.result?.toString();
        this.firestore.create({
          path: ['Users', name, 'Chats', this.currentChatId, 'Messages'],
          data: {
            message: '',
            imageUrl: readableString,
            creatorId: AppComponent.getUserDocument()?.userId,
            creatorName: AppComponent.getUserDocument()?.publicName,
            timestamp: FirebaseTSApp.getFirestoreTimestamp(),
          },
          onComplete: (docId) => {
            this.scroll.nativeElement.scrollTop =
              this.scroll.nativeElement.scrollHeight;
          },
        });
        this.firestore.create({
          path: ['Users', this.currentChatId, 'Chats', name, 'Messages'],
          data: {
            message: '',
            imageUrl: readableString,
            creatorId: AppComponent.getUserDocument()?.userId,
            creatorName: AppComponent.getUserDocument()?.publicName,
            timestamp: FirebaseTSApp.getFirestoreTimestamp(),
          },
          onComplete: (docId) => {
            this.scroll.nativeElement.scrollTop =
              this.scroll.nativeElement.scrollHeight;
          },
        });
      });
    }
  }

  isCommentCreator(message: Message) {
    try {
      return message.creatorId == AppComponent.getUserDocument()?.userId;
    } catch (error) {
      return error;
    }
  }
}

export interface Chat {
  id: string;
  name: string;
  imageUrl: string;
}
export interface Message {
  creatorId: string;
  creatorName: string;
  message?: string;
  timestamp: firebase.default.firestore.Timestamp;
  imageUrl?: string;
}
