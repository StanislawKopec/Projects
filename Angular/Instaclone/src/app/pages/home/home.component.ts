import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import {
  FirebaseTSFirestore,
  Limit,
  OrderBy,
  Where,
} from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { PostData } from 'src/app/models/post-data.model';
import { CreatePostComponent } from '../components/create-post/create-post.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  firestore = new FirebaseTSFirestore();
  posts: PostData[] = [];
  options: string[] = [];
  filteredOptions: string[] = [];
  formGroup!: FormGroup;

  constructor(private dialog: MatDialog, private builder: FormBuilder) {}

  ngOnInit(): void {
    this.getPosts();
    this.getData();
    this.initForm();
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
  getPosts() {
    this.firestore.listenToCollection({
      name: 'Load Posts',
      path: ['Posts'],
      where: [new OrderBy('timestamp', 'desc'), new Limit(10)],
      onUpdate: (result) => {
        this.posts = [];
        result.docs.forEach((doc) => {
          let post = <PostData>doc.data();
          post.postId = doc.id;
          this.posts.push(post);
        });
      },
    });
  }
}
