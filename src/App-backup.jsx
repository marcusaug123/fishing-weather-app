import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import WeatherCard from './components/WeatherCard';
import DayDetails from './components/DayDetails';
import { Loader2, AlertCircle } from 'lucide-react';

function App() {
  console.log('App component loaded');
  // Miami, Florida coordinates
  const location = { lat: 25.7617, lon: -80.1918 };
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);

  useEffect(() => {
    fetchWeatherData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchWeatherData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Fetch weather data from Open-Meteo API
      const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${location.lat}&longitude=${location.lon}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max,cloud_cover_mean&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,cloud_cover,wind_speed_10m,wind_direction_10m,surface_pressure,visibility&timezone=auto&forecast_days=7`;
      
      // Fetch marine data from Open-Meteo Marine API
      const marineUrl = `https://marine-api.open-meteo.com/v1/marine?latitude=${location.lat}&longitude=${location.lon}&daily=wave_height_max,wave_period_max&timezone=auto&forecast_days=7`;
      
      const [weatherResponse, marineResponse] = await Promise.all([
        fetch(weatherUrl),
        fetch(marineUrl)
      ]);
      
      if (!weatherResponse.ok || !marineResponse.ok) {
        throw new Error('Failed to fetch weather data');
      }
      
      const weatherJson = await weatherResponse.json();
      const marineJson = await marineResponse.json();
      
      // Combine and process the data
      const processedData = weatherJson.daily.time.map((date, index) => {
        // Get the hourly data for this day (using noon values as representative)
        const hourIndex = index * 24 + 12; // Noon of each day
        
        return {
          date: new Date(date),
          temperature_2m: weatherJson.hourly.temperature_2m[hourIndex] || weatherJson.daily.temperature_2m_max[index],
          apparent_temperature: weatherJson.hourly.apparent_temperature[hourIndex] || weatherJson.daily.temperature_2m_max[index],
          precipitation: weatherJson.daily.precipitation_sum[index] || 0,
          precipitation_probability: 0, // Not available in free tier
          wind_speed_10m: weatherJson.daily.wind_speed_10m_max[index] || 0,
          wind_direction_10m: weatherJson.hourly.wind_direction_10m[hourIndex] || 0,
          cloud_cover: weatherJson.daily.cloud_cover_mean[index] || 0,
          wave_height: marineJson.daily.wave_height_max[index] || 0,
          wave_period: marineJson.daily.wave_period_max[index] || 0,
          relative_humidity_2m: weatherJson.hourly.relative_humidity_2m[hourIndex] || 0,
          surface_pressure: weatherJson.hourly.surface_pressure[hourIndex] || 1013,
          visibility: weatherJson.hourly.visibility[hourIndex] || 10000
        };
      });
      
      setWeatherData(processedData);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching weather data:', err);
    } finally {
      setLoading(false);
    }
  };


  const handleDayClick = (index) => {
    setSelectedDay(index);
  };

  const handleCloseDetails = () => {
    setSelectedDay(null);
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="card mb-6 bg-gradient-to-r from-ocean-600 to-ocean-500 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Miami, Florida</h2>
              <p className="text-ocean-100">Your Fishing Weather Forecast</p>
            </div>
            <div className="text-right">
              <p className="text-sm">Coordinates</p>
              <p className="text-xs text-ocean-100">25.76°N, 80.19°W</p>
            </div>
          </div>
        </div>
        
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-ocean-600 animate-spin mb-4" />
            <p className="text-gray-600 text-lg">Loading weather data...</p>
          </div>
        )}
        
        {error && (
          <div className="card bg-red-50 border-2 border-red-200">
            <div className="flex items-center gap-3 text-red-800">
              <AlertCircle className="w-6 h-6" />
              <div>
                <h3 className="font-bold text-lg">Error Loading Data</h3>
                <p className="text-sm">{error}</p>
              </div>
            </div>
          </div>
        )}
        
        {!loading && !error && weatherData && (
          <>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">7-Day Fishing Forecast</h2>
              <p className="text-gray-600">Click on any day to see detailed information</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {weatherData.map((weather, index) => (
                <WeatherCard
                  key={index}
                  date={weather.date}
                  weather={weather}
                  onClick={() => handleDayClick(index)}
                  isSelected={selectedDay === index}
                />
              ))}
            </div>
            
            {selectedDay !== null && (
              <DayDetails
                date={weatherData[selectedDay].date}
                weather={weatherData[selectedDay]}
                onClose={handleCloseDetails}
              />
            )}
          </>
        )}
      </main>
      
      <footer className="bg-gray-800 text-white py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">
            Weather data provided by{' '}
            <a 
              href="https://open-meteo.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-ocean-300 hover:text-ocean-200 underline"
            >
              Open-Meteo
            </a>
          </p>
          <p className="text-xs text-gray-400 mt-2">
            Fishing scores are estimates based on weather conditions. Always check local regulations and safety conditions.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
