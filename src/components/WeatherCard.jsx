import React from 'react';
import { format } from 'date-fns';
import { Cloud, Droplets, Wind, Waves, Moon } from 'lucide-react';
import { getMoonPhase, getMoonIllumination } from '../utils/moonPhase';
import { calculateFishingScore, getScoreColor, getScoreLabel } from '../utils/fishingScore';

export default function WeatherCard({ date, weather, onClick, isSelected }) {
  const moonPhase = getMoonPhase(date);
  const moonIllumination = getMoonIllumination(date);
  const fishingScore = calculateFishingScore(weather, date);
  const scoreColor = getScoreColor(fishingScore);
  
  return (
    <div
      onClick={onClick}
      className={`card cursor-pointer transform transition-all duration-200 hover:scale-105 ${
        isSelected ? 'ring-4 ring-ocean-500 shadow-2xl' : ''
      }`}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-bold text-gray-800">
            {format(date, 'EEE, MMM d')}
          </h3>
          <p className="text-sm text-gray-500">{format(date, 'yyyy')}</p>
        </div>
        <div className="text-right">
          <div className={`badge ${scoreColor}`}>
            <span className="font-bold text-lg">{fishingScore}/10</span>
          </div>
          <p className={`text-xs mt-1 font-semibold ${scoreColor.split(' ')[0]}`}>
            {getScoreLabel(fishingScore)}
          </p>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Moon className="w-4 h-4 text-gray-600" />
            <span className="text-2xl">{moonPhase.icon}</span>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-gray-700">{moonPhase.name}</p>
            <p className="text-xs text-gray-500">{moonIllumination}% illuminated</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-200">
          <div className="flex items-center gap-2">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Cloud className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Temp</p>
              <p className="text-sm font-semibold text-gray-800">
                {Math.round(weather.temperature_2m)}°F
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="bg-cyan-100 p-2 rounded-lg">
              <Wind className="w-4 h-4 text-cyan-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Wind</p>
              <p className="text-sm font-semibold text-gray-800">
                {Math.round(weather.wind_speed_10m)} kts
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="bg-indigo-100 p-2 rounded-lg">
              <Droplets className="w-4 h-4 text-indigo-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Rain</p>
              <p className="text-sm font-semibold text-gray-800">
                {weather.precipitation.toFixed(2)} in
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="bg-teal-100 p-2 rounded-lg">
              <Waves className="w-4 h-4 text-teal-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Waves</p>
              <p className="text-sm font-semibold text-gray-800">
                {weather.wave_height.toFixed(1)} ft
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
