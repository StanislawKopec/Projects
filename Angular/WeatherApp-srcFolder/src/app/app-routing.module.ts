import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CityComponent } from './pages/city/city.component';
import { StartComponent } from './pages/start/start.component';

const routes: Routes = [
  {
    pathMatch: 'full',
    path: '',
    component: StartComponent,
  },
  {
    path: 'city',
    component: CityComponent,
  },
  {
    path: 'start/city',
    component: CityComponent,
  },
  {
    path: 'start',
    component: StartComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
