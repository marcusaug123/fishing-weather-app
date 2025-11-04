import React from 'react';
import { format } from 'date-fns';
import { 
  X, Cloud, Droplets, Wind, Waves, Moon, Sunrise, Sunset, 
  Thermometer, Eye, Gauge, CloudRain, Fish 
} from 'lucide-react';
import { getMoonPhase, getMoonIllumination } from '../utils/moonPhase';
import { calculateFishingScore, getScoreColor, getScoreLabel } from '../utils/fishingScore';

export default function DayDetails({ date, weather, onClose }) {
  const moonPhase = getMoonPhase(date);
  const moonIllumination = getMoonIllumination(date);
  const fishingScore = calculateFishingScore(weather, date);
  const scoreColor = getScoreColor(fishingScore);
  
  const conditions = [
    {
      icon: Thermometer,
      label: 'Temperature',
      value: `${Math.round(weather.temperature_2m)}°F`,
      detail: `Feels like ${Math.round(weather.apparent_temperature || weather.temperature_2m)}°F`,
      color: 'bg-red-100 text-red-600'
    },
    {
      icon: Wind,
      label: 'Wind Speed',
      value: `${Math.round(weather.wind_speed_10m)} kts`,
      detail: `Direction: ${weather.wind_direction_10m}°`,
      color: 'bg-cyan-100 text-cyan-600'
    },
    {
      icon: Droplets,
      label: 'Precipitation',
      value: `${weather.precipitation.toFixed(2)} in`,
      detail: `Humidity: ${weather.relative_humidity_2m || 'N/A'}%`,
      color: 'bg-indigo-100 text-indigo-600'
    },
    {
      icon: Waves,
      label: 'Wave Height',
      value: `${weather.wave_height.toFixed(1)} ft`,
      detail: `Period: ${weather.wave_period?.toFixed(1) || 'N/A'} s`,
      color: 'bg-teal-100 text-teal-600'
    },
    {
      icon: Cloud,
      label: 'Cloud Cover',
      value: `${weather.cloud_cover}%`,
      detail: weather.cloud_cover > 70 ? 'Overcast' : weather.cloud_cover > 40 ? 'Partly Cloudy' : 'Clear',
      color: 'bg-gray-100 text-gray-600'
    },
    {
      icon: Eye,
      label: 'Visibility',
      value: `${(weather.visibility || 10000) / 1000} km`,
      detail: weather.visibility > 5000 ? 'Good' : 'Limited',
      color: 'bg-purple-100 text-purple-600'
    },
    {
      icon: Gauge,
      label: 'Pressure',
      value: `${weather.surface_pressure || 1013} hPa`,
      detail: weather.surface_pressure > 1013 ? 'High' : 'Low',
      color: 'bg-orange-100 text-orange-600'
    },
    {
      icon: CloudRain,
      label: 'Rain Probability',
      value: `${weather.precipitation_probability || 0}%`,
      detail: weather.precipitation_probability > 70 ? 'Likely' : weather.precipitation_probability > 30 ? 'Possible' : 'Unlikely',
      color: 'bg-blue-100 text-blue-600'
    }
  ];
  
  const fishingTips = [
    {
      condition: moonPhase.score >= 9,
      tip: '🌕 Excellent moon phase! Fish are highly active during full and new moons.',
      type: 'success'
    },
    {
      condition: weather.wind_speed_10m < 10,
      tip: '💨 Light winds create ideal conditions for fishing.',
      type: 'success'
    },
    {
      condition: weather.wind_speed_10m > 20,
      tip: '⚠️ Strong winds may make fishing difficult.',
      type: 'warning'
    },
    {
      condition: weather.precipitation > 5,
      tip: '🌧️ Rain can affect visibility and fish behavior.',
      type: 'warning'
    },
    {
      condition: weather.cloud_cover >= 40 && weather.cloud_cover <= 70,
      tip: '☁️ Overcast conditions can improve fishing success.',
      type: 'success'
    },
    {
      condition: weather.wave_height >= 3 && weather.wave_height < 5,
      tip: '🌊 Rough seas (3+ ft) - fishing will be challenging.',
      type: 'warning'
    },
    {
      condition: weather.wave_height >= 5,
      tip: '⚠️ Very rough seas (5+ ft) - not recommended for fishing.',
      type: 'warning'
    }
  ];
  
  const activeTips = fishingTips.filter(tip => tip.condition);
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-gradient-to-r from-ocean-700 to-ocean-600 text-white p-6 rounded-t-2xl">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-3xl font-bold mb-2">
                {format(date, 'EEEE, MMMM d, yyyy')}
              </h2>
              <p className="text-ocean-100">Detailed Fishing Forecast</p>
            </div>
            <button
              onClick={onClose}
              className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
        
        <div className="p-6">
          {/* Fishing Score Section */}
          <div className="mb-6 bg-gradient-to-br from-ocean-50 to-blue-50 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="bg-ocean-600 p-3 rounded-full">
                  <Fish className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">Fishing Score</h3>
                  <p className="text-gray-600">Overall conditions rating</p>
                </div>
              </div>
              <div className="text-right">
                <div className={`badge ${scoreColor} text-3xl px-6 py-3`}>
                  {fishingScore}/10
                </div>
                <p className={`text-lg font-semibold mt-2 ${scoreColor.split(' ')[0]}`}>
                  {getScoreLabel(fishingScore)}
                </p>
              </div>
            </div>
            
            {/* Fishing Tips */}
            {activeTips.length > 0 && (
              <div className="mt-4 space-y-2">
                {activeTips.map((tip, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg ${
                      tip.type === 'success' 
                        ? 'bg-green-100 border-l-4 border-green-500' 
                        : 'bg-yellow-100 border-l-4 border-yellow-500'
                    }`}
                  >
                    <p className="text-sm font-medium text-gray-800">{tip.tip}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Moon Phase Section */}
          <div className="mb-6 card">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Moon className="w-5 h-5 text-ocean-600" />
              Moon Phase
            </h3>
            <div className="flex items-center justify-between bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-4">
              <div className="flex items-center gap-4">
                <span className="text-6xl">{moonPhase.icon}</span>
                <div>
                  <p className="text-2xl font-bold text-gray-800">{moonPhase.name}</p>
                  <p className="text-gray-600">{moonIllumination}% illuminated</p>
                </div>
              </div>
              <div className={`badge ${getScoreColor(moonPhase.score)} text-xl px-4 py-2`}>
                {moonPhase.score}/10
              </div>
            </div>
          </div>
          
          {/* Weather Conditions Grid */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Weather Conditions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {conditions.map((condition, index) => {
                const Icon = condition.icon;
                return (
                  <div key={index} className="card">
                    <div className="flex items-start gap-3">
                      <div className={`${condition.color} p-3 rounded-lg`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-gray-500 mb-1">{condition.label}</p>
                        <p className="text-lg font-bold text-gray-800">{condition.value}</p>
                        <p className="text-xs text-gray-600 mt-1">{condition.detail}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Tide Information */}
          <div className="card">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Waves className="w-5 h-5 text-ocean-600" />
              Tide Information
            </h3>
            <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg p-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">High Tide</p>
                  <p className="text-xl font-bold text-gray-800">~6:30 AM</p>
                  <p className="text-sm text-gray-500">Height: 5.9 ft</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Low Tide</p>
                  <p className="text-xl font-bold text-gray-800">~12:45 PM</p>
                  <p className="text-sm text-gray-500">Height: 1.3 ft</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">High Tide</p>
                  <p className="text-xl font-bold text-gray-800">~7:15 PM</p>
                  <p className="text-sm text-gray-500">Height: 6.2 ft</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Next Low Tide</p>
                  <p className="text-xl font-bold text-gray-800">~1:30 AM</p>
                  <p className="text-sm text-gray-500">Height: 1.0 ft</p>
                </div>
              </div>
              <div className="mt-4 p-3 bg-blue-100 rounded-lg">
                <p className="text-sm text-blue-800">
                  💡 <strong>Tip:</strong> Fish are most active during tide changes, especially 
                  1-2 hours before and after high tide.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
