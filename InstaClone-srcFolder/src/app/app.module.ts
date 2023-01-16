import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { InboxComponent } from './pages/inbox/inbox.component';
import { EditProfileComponent } from './pages/profile/edit-profile/edit-profile.component';

import { MatMenuModule } from '@angular/material/menu';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { SwitchAccountComponent } from './pages/components/switch-account/switch-account.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';

import { FirebaseTSApp } from 'firebasets/firebasetsApp/firebaseTSApp';
import { environment } from 'src/environments/environment';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { VerifyEmailComponent } from './pages/verify-email/verify-email.component';
import { CreatePostComponent } from './pages/components/create-post/create-post.component';
import { PostComponent } from './pages/components/post/post.component';
import { ReplyComponent } from './pages/components/reply/reply.component';
import { FooterComponent } from './pages/components/footer/footer.component';
import { ActivityComponent } from './pages/activity/activity.component';
import { NewDirectComponent } from './pages/components/new-direct/new-direct.component';
import { PostOptionsComponent } from './pages/components/post-options/post-options.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    InboxComponent,
    EditProfileComponent,
    SwitchAccountComponent,
    LoginComponent,
    RegisterComponent,
    ResetPasswordComponent,
    VerifyEmailComponent,
    CreatePostComponent,
    PostComponent,
    ReplyComponent,
    FooterComponent,
    ActivityComponent,
    NewDirectComponent,
    PostOptionsComponent,
  ],
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatAutocompleteModule,
    BrowserModule,
    AppRoutingModule,
    MatButtonToggleModule,
    MatMenuModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {
    FirebaseTSApp.init(environment.firebaseConfig);
  }
}
