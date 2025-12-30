import { useState, useCallback } from "react";
import type { WeatherData } from "../types/weather";

const API_KEY = "a719365e3d0a4644833153428251412";
const BASE_URL = "https://api.weatherapi.com/v1/current.json";

interface UseWeatherResult {
  weather: WeatherData | null;
  isLoading: boolean;
  error: string | null;
  searchWeather: (city: string) => Promise<void>;
  clearError: () => void;
}

export function useWeather(): UseWeatherResult {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchWeather = useCallback(async (city: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(city)}&aqi=no`
      );

      if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 400 || response.status === 404) {
          throw new Error(
            "City not found. Please check the spelling and try again."
          );
        }
        if (response.status === 401 || response.status === 403) {
          throw new Error(
            "API key is invalid. Please configure a valid WeatherAPI key."
          );
        }
        throw new Error(
          errorData.error?.message ||
            "Failed to fetch weather data. Please try again."
        );
      }

      const data = await response.json();

      const weatherData: WeatherData = {
        city: data.location.name,
        region: data.location.region,
        country: data.location.country,
        localtime: data.location.localtime,
        temperature: data.current.temp_c,
        temperatureF: data.current.temp_f,
        feelsLike: data.current.feelslike_c,
        feelsLikeF: data.current.feelslike_f,
        humidity: data.current.humidity,
        description: data.current.condition.text,
        icon: data.current.condition.icon,
        windSpeed: data.current.wind_kph,
        windDir: data.current.wind_dir,
        pressure: data.current.pressure_mb,
        cloud: data.current.cloud,
        visibility: data.current.vis_km,
        uv: data.current.uv,
        isDay: data.current.is_day === 1,
      };

      setWeather(weatherData);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "An unexpected error occurred";
      setError(message);
      setWeather(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return { weather, isLoading, error, searchWeather, clearError };
}
