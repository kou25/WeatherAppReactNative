export type IconsType = "sunny" | "rainy" | "snow" | "cloud";

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface WeatherInfoProps {
  city: { country: string; id: number; name: string };
  list: ListOfWeatherInfo[];
}

export interface ListOfWeatherInfo {
  dt_txt: string;
  main: {
    temp: number;
  };
  weather: WeatherIconInfo[];
}

export interface WeatherIconInfo {
  main: string;
}

export interface CurrentWeather {
  weather: CurrentWeatherInfo[];
  main: {
    temp: number;
  };
  timezone: number;
}

export interface CurrentWeatherInfo {
  description: string;
  main: string;
}
