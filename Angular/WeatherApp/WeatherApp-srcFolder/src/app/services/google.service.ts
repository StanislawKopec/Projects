import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GoogleService {
  private _city = new BehaviorSubject<string>('');
  public city = this._city.asObservable();

  private _cityName = new BehaviorSubject<string>('');
  public cityName = this._cityName.asObservable();

  private _searchCityResponse = new BehaviorSubject<boolean>(false);
  public searchCityResponse = this._searchCityResponse.asObservable();

  constructor(private http: HttpClient) {}

  ngOnInit() {}

  cityObs: any;

  public loadData() {
    if (localStorage.getItem('cityObs') !== null) {
      var json = JSON.parse(localStorage.getItem('cityObs')!);
      this._city.next(json.variable);
      this._cityName.next(localStorage.getItem('cityName')!);
    }
  }
  saveData(cityObs: string, cityName: string) {
    let data = { id: 1, variable: cityObs };

    localStorage.setItem('cityName', cityName);
    localStorage.setItem('cityObs', JSON.stringify(data));
  }

  parseData(address: string): void {
    this._searchCityResponse.next(false);
    this.http
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyBB00Ygy3VIYm39iM37iyWkxranZNrAAHI`
      )
      .subscribe((response) => {
        var jsonstring = JSON.stringify(response);
        var json = JSON.parse(jsonstring);
        if (json.status == 'OK') {
          this._searchCityResponse.next(true);
          var lat: string = json.results[0].geometry.location.lat;
          var lng: string = json.results[0].geometry.location.lng;
          var latlng: string = 'lat=' + lat + '&lon=' + lng;
          this._city.next(latlng);
          this._cityName.next(address);
          this.saveData(latlng, address);
        }
      });
  }
}
