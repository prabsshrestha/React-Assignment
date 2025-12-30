import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Cloud, MapPin, AlertCircle } from "lucide-react";
import { useWeather } from "../context/UseWeather";
import { WeatherSearch } from "../components/weather/WeatherSearch";

export default function Weather() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { weather, isLoading, error, searchWeather, clearError } = useWeather();

  const cityParam = searchParams.get("city");

  useEffect(() => {
    if (cityParam) {
      searchWeather(cityParam);
    }
  }, []);

  const handleSearch = (city: string) => {
    setSearchParams({ city });
    searchWeather(city);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="mb-2 text-3xl font-bold text-gray-900">Weather</h1>
        <p className="text-gray-500">
          Get real-time weather information for any city worldwide.
        </p>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-md">
        <WeatherSearch onSearch={handleSearch} isLoading={isLoading} />
      </div>

      {error && (
        <div className="flex items-center gap-2 rounded-md border border-red-200 bg-red-50 p-4 text-red-600 animate-scale-in">
          <AlertCircle size={18} />
          <span className="text-sm">{error}</span>
        </div>
      )}

      {isLoading && (
        <div className="animate-pulse rounded-lg border border-gray-200 bg-white p-12 shadow-md">
          <div className="flex flex-col items-center justify-center">
            <div className="mb-4 h-16 w-16 rounded-full bg-gray-200" />
            <div className="mb-2 h-8 w-32 rounded bg-gray-200" />
            <div className="h-4 w-48 rounded bg-gray-200" />
          </div>
        </div>
      )}

    </div>
  );
}
