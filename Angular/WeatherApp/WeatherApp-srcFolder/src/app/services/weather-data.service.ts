import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { async, BehaviorSubject, Observable, Subscription } from 'rxjs';
import { __values } from 'tslib';
import { cityWeather, weatherArray } from 'src/app/models/cityWeather.model';
import { GoogleService } from './google.service';

@Injectable({
  providedIn: 'root',
})
export class WeatherDataService {
  private _object = new BehaviorSubject<cityWeather[]>([
    {
      city: '',
      humidity: '',
      wind: '',
      weather: '',
      temperature: '',
      imageUrl: '',
    },
  ]);
  public object = this._object.asObservable();
  private _weatherDate = new BehaviorSubject<string>('');
  public weatherDate = this._weatherDate.asObservable();

  private objectArray: weatherArray = { weathers: [] };

  constructor(private http: HttpClient, private googleService: GoogleService) {}

  parseData(address: string): void {
    var key = '4b410a1067df10cc815f212da4d89ef0';

    if (address)
      this.http
        .get(
          `https://api.openweathermap.org/data/2.5/forecast?${address}&appid=${key}`,
          { observe: 'response' }
        )
        .subscribe((response) => {
          var json = JSON.stringify(response);
          var myArray = JSON.parse(json);
          this._weatherDate.next(myArray.body.list[0].dt_txt);

          for (var i = 0; i < 40; i++) {
            var City: string = myArray.body.city.name.toString();
            var humidity: string = myArray.body.list[i].main.humidity;
            var wind: string = myArray.body.list[i].wind.speed;
            var weather: string = myArray.body.list[i].weather[0].main;
            var temperature: string = (
              myArray.body.list[i].main.temp - 273.15
            ).toFixed(0);
            var imageUrl =
              'https://openweathermap.org/img/wn/' +
              myArray.body.list[i].weather[0].icon +
              '.png';
            var objectx = {
              city: City,
              humidity: humidity,
              wind: wind,
              weather: weather,
              temperature: temperature,
              imageUrl: imageUrl,
            };
            this.objectArray.weathers.push(objectx);
          }
          this._object.next(this.objectArray.weathers);

          this.objectArray.weathers = [];
        });
  }
}
