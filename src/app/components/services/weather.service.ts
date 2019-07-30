import { Injectable } from '@angular/core';
import { CurrentWeather } from '../current/current-weather'
import { HttpClient } from '@angular/common/http';
import { Forecast } from '../forecast/forecast'


@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  current: CurrentWeather = new CurrentWeather('Loading..', 'Loading..', 'Loading..', 'Loading..', 'Loading..', '', 'Loading..', 'Loading..', 'Loading..', 'Loading..');

  constructor(private http: HttpClient) { }

  weatherNow() {
    return this.current;
  }

  localWeather(lat: string, lon: string) {
    return this.http.get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=de95355dadf51402b42727c557936c16&units=metric`);
  }

  anotherCity(city: string) {
    return this.http.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=de95355dadf51402b42727c557936c16&units=metric`)
  }

  forecastDays(city: string) {
    return this.http.get(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=de95355dadf51402b42727c557936c16&units=metric`)
  }
}
