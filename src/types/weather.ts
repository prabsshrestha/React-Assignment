export interface WeatherData {
  city: string;
  region: string;
  country: string;
  localtime: string;
  temperature: number;
  temperatureF: number;
  feelsLike: number;
  feelsLikeF: number;
  humidity: number;
  description: string;
  icon: string;
  windSpeed: number;
  windDir: string;
  pressure: number;
  cloud: number;
  visibility: number;
  uv: number;
  isDay: boolean;
}

export interface WeatherError {
  message: string;
}
