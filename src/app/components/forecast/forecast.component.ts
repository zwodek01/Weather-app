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

  constructor(private weatherService: WeatherService) { }

  forecastForm: FormGroup
  cityForecast: Forecast[] = [];

  ngOnInit() {
    this.forecastForm = new FormGroup({
      forecastCity: new FormControl('Warsaw')
    })
  }

  onSubmit() {
    this.weatherService.forecastDays(this.forecastForm.value.forecastCity).subscribe((data) => {
      for (let i = 0; i < data['list'].length; i += 8) {
        const temp = new Forecast(data['list'][i].dt_txt,
          data['list'][i].weather[0].icon,
          data['list'][i].weather[0].description,
          data['list'][i].main.temp_max,
          data['list'][i].main.temp_min)
        this.cityForecast.push(temp);
      }
    });
  }

}
