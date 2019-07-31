export class Forecast {
    constructor(public cityName: string,
        public day: string,
        public icon: string,
        public description: string,
        public tempMax: string,
        public tempMin: string) { }
}
