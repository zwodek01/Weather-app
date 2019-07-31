import { Injectable } from '@angular/core';
import { CurrentWeather } from '../current/current-weather'
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  current: CurrentWeather = new CurrentWeather('', '', '', '', '', '', '', '', '', '');

  constructor(private http: HttpClient) { }

  weatherNow() {
    return this.current;
  }


  handleError() {
    const errorMessage = `Wrong city name or internet issue`;
    return throwError(errorMessage);
  }

  localWeather(lat: string, lon: string) {
    return this.http.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=de95355dadf51402b42727c557936c16&units=metric`).pipe(
    );
  }

  anotherCity(city: string) {
    return this.http.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=de95355dadf51402b42727c557936c16&units=metric`).pipe(
      catchError(this.handleError)
    );
  }

  forecastDays(city: string) {
    return this.http.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=de95355dadf51402b42727c557936c16&units=metric`).pipe(
      catchError(this.handleError)
    );
  }
}
