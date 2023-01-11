import { Component } from '@angular/core';
import { WeatherDataService } from './services/weather-data.service';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
  styleUrls: [],
})
export class AppComponent {
  constructor() {}
}
