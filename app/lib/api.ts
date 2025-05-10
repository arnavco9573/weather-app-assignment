import axios from "axios";
import type { Weather, WeatherForecast } from "@/app/types";

// Base API configurations
const GEONAMES_API_URL =
  "https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records";

export const fetchIndianCities = async () => {
  const response = await axios.get(GEONAMES_API_URL, {
    params: {
      where: "country_code='IN'", // 'IN' is India's ISO code
      limit: 100,
      order_by: "population DESC",
    },
  });
  return response.data.results;
};
const OPENWEATHER_API_URL = "https://api.openweathermap.org/data/2.5";
const OPENWEATHER_API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY; // Set in .env
if (!OPENWEATHER_API_KEY) {
  throw new Error("Missing OpenWeather API key in environment variables.");
}

// Fetch cities with pagination, search, and filters
export const fetchCities = async (
  query: string = "",
  limit: number = 20,
  offset: number = 0
) => {
  const params = {
    where: query ? `search(name, "${query}")` : undefined,
    limit,
    offset,
  };

  const response = await axios.get(GEONAMES_API_URL, { params });
  return response.data.results;
};

export const fetchWeatherByCity = async (
  cityName: string
): Promise<Weather> => {
  const response = await axios.get(
    `${OPENWEATHER_API_URL}/weather?q=${cityName}&appid=${OPENWEATHER_API_KEY}&units=metric`
  );
  return response.data;
};

export const fetchWeatherForecast = async (
  cityName: string
): Promise<WeatherForecast> => {
  const response = await axios.get(
    `${OPENWEATHER_API_URL}/forecast?q=${cityName}&appid=${OPENWEATHER_API_KEY}&units=metric&cnt=40`
  );
  return response.data;
};
