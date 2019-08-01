import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { opacityAnimation } from './animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [opacityAnimation]
})
export class AppComponent {
  title = 'weather-app';
  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}