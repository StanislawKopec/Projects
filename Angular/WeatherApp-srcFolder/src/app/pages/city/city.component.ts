import { Component, OnInit } from '@angular/core';
import { GoogleService } from 'src/app/services/google.service';
import { WeatherDataService } from 'src/app/services/weather-data.service';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css'],
})
export class CityComponent implements OnInit {
  public numberArray: number[];

  public temperature: string = '';
  public weatherType: string = '';
  public humidity: string = '';
  public wind: string = '';
  public city: string = '';
  public mainImageUrl: string = '';

  public day2: [
    temperature: string,
    weatherType: string,
    day: string,
    imageUrl: string
  ] = ['', '', '', ''];
  public day3: [
    temperature: string,
    weatherType: string,
    day: string,
    imageUrl: string
  ] = ['', '', '', ''];
  public day4: [
    temperature: string,
    weatherType: string,
    day: string,
    imageUrl: string
  ] = ['', '', '', ''];
  public day5: [
    temperature: string,
    weatherType: string,
    day: string,
    imageUrl: string
  ] = ['', '', '', ''];

  public currentDay: number = 0;
  public currentDayStr: string = '';
  public currentDate: string = '';
  public currentHour: number = 0;
  public hoursArray: number[] = [];
  public tmpArray: string[] = [];

  public currentDateString: string = '';

  constructor(
    private weather: WeatherDataService,
    private googleService: GoogleService
  ) {
    this.currentDay = new Date().getDay();
    this.numberArray = Array(8)
      .fill(1)
      .map((x, i = 3) => 3 * (i + 1));
  }
  title = 'WeatherApp';

  ngOnInit() {
    var today = new Date();
    var currentDayStrVar = today.getDay();
    var dd = today.getDate().toString();
    var mm = (today.getMonth() + 1).toString();
    var yyyy = today.getFullYear().toString();

    this.currentDate = dd + '/' + mm + '/' + yyyy;

    switch (currentDayStrVar) {
      case 1: {
        this.currentDayStr = 'Monday';
        break;
      }
      case 2: {
        this.currentDayStr = 'Tuesday';
        break;
      }
      case 3: {
        this.currentDayStr = 'Wednesday';
        break;
      }
      case 4: {
        this.currentDayStr = 'Thursday';
        break;
      }
      case 5: {
        this.currentDayStr = 'Friday';
        break;
      }
      case 6: {
        this.currentDayStr = 'Saturday';
        break;
      }
      case 0: {
        this.currentDayStr = 'Sunday';
        break;
      }
    }

    var address: string = '';

    this.googleService.loadData();

    this.weather.weatherDate.subscribe((date) => {
      this.currentDateString = date;
    });

    this.googleService.cityName.subscribe((cityName) => {
      this.city = cityName;
    });

    this.googleService.city.subscribe((city1) => {
      address = city1.toString();
      this.weather.parseData(address);
    });

    this.weather.object.subscribe((response) => {
      this.tmpArray = [];
      this.tmpArray.push(
        response[0].temperature,
        response[1].temperature,
        response[2].temperature,
        response[3].temperature,
        response[4].temperature,
        response[5].temperature,
        response[6].temperature,
        response[7].temperature
      );
      this.calculateHour(),
        //(this.city = response[0].city),
        (this.humidity = response[0].humidity),
        (this.weatherType = response[0].weather),
        (this.wind = response[0].wind),
        (this.temperature = response[0].temperature),
        (this.mainImageUrl = response[0].imageUrl),
        (this.day2[0] = response[8].temperature),
        (this.day2[1] = response[8].weather),
        (this.day2[3] = response[8].imageUrl),
        (this.day3[0] = response[16].temperature),
        (this.day3[1] = response[16].weather),
        (this.day3[3] = response[16].imageUrl),
        (this.day4[0] = response[24].temperature),
        (this.day4[1] = response[24].weather),
        (this.day4[3] = response[24].imageUrl),
        (this.day5[0] = response[32].temperature),
        (this.day5[1] = response[32].weather),
        (this.day5[3] = response[32].imageUrl);
    });
    switch (this.currentDay) {
      case 1: {
        this.day2[2] = 'Tuesday';
        this.day3[2] = 'Wednesday';
        this.day4[2] = 'Thursday';
        this.day5[2] = 'Friday';
        break;
      }
      case 2: {
        this.day2[2] = 'Wednesday';
        this.day3[2] = 'Thursday';
        this.day4[2] = 'Friday';
        this.day5[2] = 'Saturday';
        break;
      }
      case 3: {
        this.day2[2] = 'Thursday';
        this.day3[2] = 'Friday';
        this.day4[2] = 'Saturday';
        this.day5[2] = 'Sunday';
        break;
      }
      case 4: {
        this.day2[2] = 'Friday';
        this.day3[2] = 'Saturday';
        this.day4[2] = 'Sunday';
        this.day5[2] = 'Monday';
        break;
      }
      case 5: {
        this.day2[2] = 'Saturday';
        this.day3[2] = 'Sunday';
        this.day4[2] = 'Monday';
        this.day5[2] = 'Tuesday';
        break;
      }
      case 6: {
        this.day2[2] = 'Sunday';
        this.day3[2] = 'Monday';
        this.day4[2] = 'Wednesday';
        this.day5[2] = 'Thursday';
        break;
      }
      case 0: {
        this.day2[2] = 'Monday';
        this.day3[2] = 'Tuesday';
        this.day4[2] = 'Wednesday';
        this.day5[2] = 'Thursday';
        break;
      }
    }
  }
  calculateHour(): void {
    var x: number;

    var hour = '';
    for (var i = 11; i < 13; i++) {
      hour = hour + this.currentDateString[i];
    }
    this.currentHour = +hour;

    for (var i = 0; i < 8; i++) {
      if (this.currentHour < this.numberArray[i]) {
        x = i;
        i = 8;
        this.transformHoursArray(x);
      }
    }
  }
  transformHoursArray(x: number): void {
    var transformedArray = [];
    for (var i = 0; i < 8; i++) {
      transformedArray[i] = this.numberArray[i + x - 1];
      if (i + x - 1 >= 8 && i) {
        transformedArray[i] = this.numberArray[i + x - 9];
      }
    }
    this.hoursArray = transformedArray;
  }
}
