import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { CurrentWeather } from '../current/current-weather';
import { NgForm } from '@angular/forms'

@Component({
  selector: 'app-current',
  templateUrl: './current.component.html',
  styleUrls: ['./current.component.scss']
})
export class CurrentComponent implements OnInit {

  myWeather: CurrentWeather;
  location: any;
  dataFromApi: boolean;

  constructor(private weatherService: WeatherService) { }

  ngOnInit() {

    this.myWeather = this.weatherService.weatherNow();
    navigator.geolocation.getCurrentPosition((pos) => {
      this.location = pos.coords;

      const lat = this.location.latitude;
      const lon = this.location.longitude;

      this.weatherService.localWeather(lat, lon).subscribe((data: any) => {
        this.myWeather = new CurrentWeather(
          data.name,
          data.sys.country,
          data.main.humidity,
          data.main.pressure,
          data.main.temp,
          data.weather[0].icon,
          data.weather[0].description,
          data.main.temp_max,
          data.main.temp_min,
          data.wind.speed)
        this.dataFromApi = true;
      })
    })
  }

  onSubmit(weatherForm: NgForm) {
    this.weatherService.anotherCity(weatherForm.value.city).subscribe((data: any) => {
      this.myWeather = new CurrentWeather(
        data.name,
        data.sys.country,
        data.main.humidity,
        data.main.pressure,
        data.main.temp,
        data.weather[0].icon,
        data.weather[0].description,
        data.main.temp_max,
        data.main.temp_min,
        data.wind.speed)
    })
  }
}



