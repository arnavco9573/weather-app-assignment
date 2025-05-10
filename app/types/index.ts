// City data type (from Geonames API)
export interface City {
  geoname_id: number;
  name: string;
  ascii_name: string;
  cou_name_en: string;
  timezone: string;
  coordinates: {
    lon: number;
    lat: number;
  };
  population?: number;
}

export interface Weather {
  coord: {
    lon: number;
    lat: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    country: string;
  };
  timezone: number;
  id: number;
  name: string;
}

export interface ForecastItem {
  dt: number;
  main: Omit<Weather['main'], 'feels_like'>;
  weather: Weather['weather'];
  clouds: Weather['clouds'];
  wind: Weather['wind'];
  dt_txt: string;
}

export interface WeatherForecast {
  cod: string;
  message: number;
  cnt: number;
  list: ForecastItem[];
  city: {
    id: number;
    name: string;
    coord: Weather['coord'];
    country: string;
    timezone: number;
  };
}