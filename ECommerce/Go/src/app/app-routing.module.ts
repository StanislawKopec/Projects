import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppHeaderComponent } from './components/app-header/app-header.component';
import { CartComponent } from './pages/cart/cart.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { SuccessComponent } from './pages/static-pages/success/success.component';
import { FailureComponent } from './pages/static-pages/failure/failure.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'home/cart',
    component: CartComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'success',
    component: SuccessComponent,
  },
  {
    path: 'failure',
    component: FailureComponent,
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
