import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { AppHeaderComponent } from './components/app-header/app-header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './pages/login/login.component';
import { SafePipe } from './safe.pipe';
import { ProductBoxComponent } from './pages/home/components/product-box/product-box.component';
import { CartService } from './service/cart.service';
import { CartComponent } from './pages/cart/cart.component';
import { ProductService } from './service/product.service';
import { CategoriesComponent } from './pages/home/components/categories/categories.component';
import { PopupComponent } from './pages/home/components/popup/popup.component';
import { NextDirective } from './pages/home/components/popup/directives/next.directive';
import { PrevDirective } from './pages/home/components/popup/directives/prev.directive';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { RegisterComponent } from './pages/register/register.component';
import { SuccessComponent } from './pages/static-pages/success/success.component';
import { FailureComponent } from './pages/static-pages/failure/failure.component';

@NgModule({
  declarations: [
    HomeComponent,
    AppComponent,
    AppHeaderComponent,
    LoginComponent,
    SafePipe,
    ProductBoxComponent,
    CartComponent,
    CategoriesComponent,
    PopupComponent,
    NextDirective,
    PrevDirective,
    RegisterComponent,
    SuccessComponent,
    FailureComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatGridListModule,
    MatMenuModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatExpansionModule,
    MatListModule,
    MatToolbarModule,
    MatTableModule,
    MatBadgeModule,
    MatSnackBarModule,
    MatDialogModule,
  ],
  providers: [
    CartService,
    ProductService,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
