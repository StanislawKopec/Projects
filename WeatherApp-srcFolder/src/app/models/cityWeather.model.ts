export interface cityWeather {
  city: string;
  humidity: string;
  wind: string;
  weather: string;
  temperature: string;
  imageUrl: string;
}
export interface weatherArray {
  weathers: Array<cityWeather>;
}
