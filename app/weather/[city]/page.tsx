'use client';
import { useEffect, useState } from 'react';
import { fetchWeatherByCity, fetchWeatherForecast } from '@/app/lib/api';
import { Weather, WeatherForecast } from '@/app/types';
import { useRouter, useParams } from 'next/navigation';
import { WeatherSkeleton } from '@/app/components/WeatherSkeleton';
import { WiDaySunny, WiRain, WiCloudy, WiSnow, WiThunderstorm, WiFog } from 'react-icons/wi';
    
export default function WeatherPage() {
  const params = useParams();
  const [decodedCity, setDecodedCity] = useState<string>('');
  const [currentWeather, setCurrentWeather] = useState<Weather | null>(null);
  const [forecast, setForecast] = useState<WeatherForecast | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (params.city) {
      const city = Array.isArray(params.city) ? params.city[0] : params.city;
      setDecodedCity(decodeURIComponent(city));
    }
  }, [params]);

  useEffect(() => {
    if (!decodedCity) return;

    const loadWeatherData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const [current, forecast] = await Promise.all([
          fetchWeatherByCity(decodedCity),
          fetchWeatherForecast(decodedCity),
        ]);
        
        if (!current || !forecast) {
          throw new Error('No weather data received');
        }
        
        setCurrentWeather(current);
        setForecast(forecast);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load weather data');
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(loadWeatherData, 500); // Small delay for smoother transitions
    
    return () => clearTimeout(timer);
  }, [decodedCity]);

  const getWeatherIcon = (condition: string) => {
    const size = 64;
    switch (condition.toLowerCase()) {
      case 'clear':
        return <WiDaySunny size={size} className="text-yellow-400" />;
      case 'rain':
        return <WiRain size={size} className="text-blue-400" />;
      case 'clouds':
        return <WiCloudy size={size} className="text-gray-400" />;
      case 'snow':
        return <WiSnow size={size} className="text-blue-200" />;
      case 'thunderstorm':
        return <WiThunderstorm size={size} className="text-purple-500" />;
      case 'fog':
      case 'mist':
        return <WiFog size={size} className="text-gray-300" />;
      default:
        return <WiDaySunny size={size} className="text-yellow-400" />;
    }
  };

  const getBackgroundClass = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'clear':
        return 'bg-gradient-to-br from-blue-400 to-yellow-200';
      case 'rain':
        return 'bg-gradient-to-br from-gray-400 to-blue-600';
      case 'clouds':
        return 'bg-gradient-to-br from-gray-300 to-gray-500';
      case 'snow':
        return 'bg-gradient-to-br from-blue-100 to-blue-300';
      case 'thunderstorm':
        return 'bg-gradient-to-br from-purple-800 to-gray-700';
      default:
        return 'bg-gradient-to-br from-gray-100 to-gray-300';
    }
  };

  if (loading) return <WeatherSkeleton />;
  
  if (error) return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-6 text-center">
        <div className="text-red-500 text-5xl mb-4">⚠️</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Weather Data Unavailable</h1>
        <p className="text-gray-600 mb-6">{error}</p>
        <button
          onClick={() => router.push('/cities')}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Back to Cities
        </button>
      </div>
    </div>
  );

  if (!currentWeather) return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-6 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">No Weather Data Found</h1>
        <p className="text-gray-600 mb-6">We couldn't find weather information for {decodedCity}</p>
        <button
          onClick={() => router.back()}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Back to Cities
        </button>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen ${getBackgroundClass(currentWeather.weather[0].main)} p-4 md:p-8 transition-all duration-500`}>
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => router.push('/cities')}
          className="mb-6 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-lg hover:bg-white transition-colors shadow-md flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Cities
        </button>

        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden">
          {/* Current Weather */}
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800">{decodedCity}</h1>
                <p className="text-lg text-gray-600 mt-1">
                  {new Date(currentWeather.dt * 1000).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
              <div className="flex items-center">
                {getWeatherIcon(currentWeather.weather[0].main)}
                <div className="ml-4">
                  <span className="text-5xl font-bold text-gray-800">
                    {Math.round(currentWeather.main.temp)}°C
                  </span>
                  <p className="text-xl capitalize text-gray-600 mt-1">
                    {currentWeather.weather[0].description}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
              <WeatherDetail 
                label="Feels Like" 
                value={`${Math.round(currentWeather.main.feels_like)}°C`} 
                icon="thermometer" 
              />
              <WeatherDetail 
                label="Humidity" 
                value={`${currentWeather.main.humidity}%`} 
                icon="droplet" 
              />
              <WeatherDetail 
                label="Wind Speed" 
                value={`${currentWeather.wind.speed} m/s`} 
                icon="wind" 
              />
              <WeatherDetail 
                label="Pressure" 
                value={`${currentWeather.main.pressure} hPa`} 
                icon="barometer" 
              />
            </div>
          </div>

          {/* 5-Day Forecast */}
          <div className="bg-gray-50/80 p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">5-Day Forecast</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {forecast?.list
                .filter((_, index) => index % 8 === 0)
                .slice(0, 5)
                .map((day) => (
                  <div key={day.dt} className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                    <p className="font-semibold text-gray-800">
                      {new Date(day.dt_txt).toLocaleDateString('en-US', {
                        weekday: 'short'
                      })}
                    </p>
                    <div className="flex items-center justify-center my-3">
                      {getWeatherIcon(day.weather[0].main)}
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-gray-800">
                        {Math.round(day.main.temp_max)}°
                      </span>
                      <span className="text-gray-500">
                        {Math.round(day.main.temp_min)}°
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-2 capitalize">
                      {day.weather[0].description}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function WeatherDetail({ label, value, icon }: { label: string; value: string; icon?: string }) {
  const getIcon = () => {
    const size = 20;
    switch (icon) {
      case 'thermometer':
        return <WiDaySunny size={size} className="text-blue-500" />;
      case 'droplet':
        return <WiRain size={size} className="text-blue-400" />;
      case 'wind':
        return <WiCloudy size={size} className="text-gray-500" />;
      case 'barometer':
        return <WiDaySunny size={size} className="text-purple-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <div className="flex items-center gap-2">
        {icon && getIcon()}
        <p className="text-gray-500 text-sm">{label}</p>
      </div>
      <p className="font-semibold text-gray-800 mt-1">{value}</p>
    </div>
  );
}