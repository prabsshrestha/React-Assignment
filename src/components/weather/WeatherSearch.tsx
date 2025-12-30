import { useState } from "react";
import { Search } from "lucide-react";

interface WeatherSearchProps {
  onSearch: (city: string) => void;
  isLoading: boolean;
}

export function WeatherSearch({ onSearch, isLoading }: WeatherSearchProps) {
  const [city, setCity] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
    }
  };

  return (
    <form className="weather-search" onSubmit={handleSubmit}>
      <div className="input-wrapper">
        <Search size={18} className="search-icon" />

        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Search city..."
          disabled={isLoading}
          className="search-input"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading || !city.trim()}
        className="search-button"
      >
        {isLoading ? "Searching..." : "Search"}
      </button>
    </form>
  );
}
