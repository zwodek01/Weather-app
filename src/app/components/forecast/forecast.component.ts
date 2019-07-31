import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Forecast } from '../forecast/forecast'
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss']
})
export class ForecastComponent implements OnInit {
  error: string;

  constructor(private weatherService: WeatherService) { }

  forecastForm: FormGroup
  cityForecast: Forecast[] = [];

  ngOnInit() {
    this.forecastForm = new FormGroup({
      forecastCity: new FormControl('')
    })
    this.getFromSessionStorage();
  }

  cityName: string;

  onSubmit() {
    this.cityForecast = [];
    this.error = "";
    if (this.forecastForm.value.forecastCity !== "") {
      this.weatherService.forecastDays(this.forecastForm.value.forecastCity).subscribe((data) => {
        for (let i = 0; i < data['list'].length; i += 8) {
          const temp = new Forecast(data['city'].name,
            data['list'][i].dt_txt,
            data['list'][i].weather[0].icon,
            data['list'][i].weather[0].description,
            data['list'][i].main.temp_max,
            data['list'][i].main.temp_min)
          console.log(data)
          this.cityForecast.push(temp);
          sessionStorage.setItem('ArrayWeather', JSON.stringify(this.cityForecast));
        }
        this.cityName = this.forecastForm.value.forecastCity;
      },
        error => {
          this.error = error;
        });
    } else {
      this.cityName = "";
      this.error = "Write a city name"
    }
  }

  getFromSessionStorage() {
    let item = JSON.parse(sessionStorage.getItem('ArrayWeather'));
    if (item !== null) {
      for (let i = 0; i < item.length; i++) {
        const temp = new Forecast(item[i].city,
          item[i].day,
          item[i].icon,
          item[i].description,
          item[i].tempMax,
          item[i].tempMin)
        this.cityForecast.push(temp);
      }
      this.cityName = item[0].cityName;
    }
  }
}
