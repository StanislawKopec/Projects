import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { MatDialogRef } from '@angular/material/dialog';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import {
  FirebaseTSFirestore,
  Where,
} from 'firebasets/firebasetsFirestore/firebaseTSFirestore';

@Component({
  selector: 'app-new-direct',
  templateUrl: './new-direct.component.html',
  styleUrls: ['./new-direct.component.scss'],
})
export class NewDirectComponent implements OnInit {
  firestore = new FirebaseTSFirestore();
  auth = new FirebaseTSAuth();
  options: string[] = [];
  filteredOptions: string[] = [];
  formGroup!: FormGroup;

  constructor(
    private builder: FormBuilder,
    private dialogRef: MatDialogRef<NewDirectComponent>
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.getData();
  }
  initForm() {
    this.formGroup = this.builder.group({
      username: [''],
    });
    this.formGroup.get('username')?.valueChanges.subscribe((result) => {
      this.filterData(result);
    });
  }
  filterData(data: any) {
    this.filteredOptions = this.options.filter((item) => {
      return item.toLowerCase().indexOf(data.toLowerCase()) > -1;
    });
  }

  getData() {
    this.firestore.getCollection({
      path: ['Users'],
      where: [],
      onComplete: (result) => {
        result.docs.forEach((doc) => {
          let userDocumnt = doc.data();
          this.options.push(userDocumnt['publicName']);
          this.filteredOptions = this.options;
        });
      },
    });
  }

  onAddChatClick() {
    var user = this.formGroup.get('username')?.value;
    var name = <string>this.auth.getAuth().currentUser?.uid;
    var userId: string;

    this.firestore.getCollection({
      path: ['Users'],
      where: [],
      onComplete: (result) => {
        result.docs.forEach((doc) => {
          let userDocument = doc.data();
          if (userDocument['publicName'] == user) {
            userId = doc.id;
            this.firestore.create({
              path: ['Users', name, 'Chats', userId], //chat creator
              data: {},
              onComplete: (docId) => {
                this.firestore.create({
                  path: ['Users', name, 'Chats', docId, 'Messages'],
                  data: {},
                });
              },
            });

            this.firestore.create({
              path: ['Users', userId, 'Chats', name], //creating chat for opposite user
              data: {},
              onComplete: (docId) => {
                this.firestore.create({
                  path: ['Users', userId, 'Chats', docId, 'Messages'],
                  data: {},
                });
                this.closeDialog();
              },
            });
          }
        });
      },
    });
  }
  onChooseOptionClick(option: string) {
    this.formGroup.get('username')?.setValue(option);
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
